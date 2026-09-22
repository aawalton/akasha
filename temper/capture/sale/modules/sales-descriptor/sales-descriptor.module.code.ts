import type { SalesPayload } from "akasha/temper/capture/sale/modules/sales-payload/sales-payload.module.code.ts"
import type { CaptureDescriptor } from "akasha/temper/modules/descriptor/descriptor.module.code.ts"

const DEFAULTS: SalesPayload = { version: 1, sales: {} }

export const SALES_CAPTURE_DESCRIPTOR: CaptureDescriptor<SalesPayload> = {
  addonName: "TemperItems",
  savedVariablesName: "TemperSales_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
