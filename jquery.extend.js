$.extend({
    loopAjax: function (array, ajaxCfg, finishFunc) {
        function _loopAjax(ix, array, ajaxCfg, finishFunc) {
            var total = array.length;
            if (ix >= total) {
                finishFunc();
                return;
            }
            var data = $.extend({}, ajaxCfg.data || {}, array[ix]);
            var func = ajaxCfg.success || function (data) {
            };
            var successFunc = function (data) {
                func(data);
                _loopAjax(ix + 1, array, ajaxCfg, finishFunc);
            };
            var newAjaxParams = $.extend({}, { dataType: 'json', type: 'get' }, ajaxCfg, {
                data: data,
                success: successFunc
            });
            $.ajax(newAjaxParams);
        }

        _loopAjax(0, array, ajaxCfg, finishFunc);
    }
})