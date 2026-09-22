import "akasha/temper/addon/pages/items/guild-history/modules/sales-history-public-api/sales-history-public-api.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/sales-addon-name/sales-addon-name.module.code.ts"
import {
  setSalesAccessor,
  startSalesCapture,
} from "akasha/temper/addon/pages/items/modules/sales-capture/sales-capture.module.code.ts"
import { SALES_CAPTURE_DESCRIPTOR } from "akasha/temper/capture/sale/modules/sales-descriptor/sales-descriptor.module.code.ts"
import { defineCaptureWriter } from "akasha/temper/capture/writer/modules/capture-writer/capture-writer.module.code.ts"

defineCaptureWriter(SALES_CAPTURE_DESCRIPTOR, (writer) => {
  const sv = writer.getSavedVariables()
  sv.displayName = GetDisplayName()
  setSalesAccessor(writer.getSavedVariables)
  startSalesCapture(ADDON_NAME)
})
