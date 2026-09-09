import "akasha/temper/temper-eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"

import { SALES_CAPTURE_DESCRIPTOR } from "akasha/temper/capture-sales/sales-descriptor/sales-descriptor.module.code.ts"
import { defineCaptureWriter } from "akasha/temper/capture-writer/capture-writer/capture-writer.module.code.ts"
import { ADDON_NAME } from "../sales-addon-name/sales-addon-name.module.code.ts"
import { setSalesAccessor, startSalesCapture } from "../sales-capture/sales-capture.module.code.ts"

defineCaptureWriter(SALES_CAPTURE_DESCRIPTOR, (writer) => {
  const sv = writer.getSavedVariables()
  sv.displayName = GetDisplayName()
  setSalesAccessor(writer.getSavedVariables)
  startSalesCapture(ADDON_NAME)
})
