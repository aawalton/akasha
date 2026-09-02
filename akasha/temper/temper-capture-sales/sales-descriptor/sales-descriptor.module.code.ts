import type { CaptureDescriptor } from "@akasha/temper-capture-descriptor/descriptor"
import type { SalesPayload } from "../sales-payload/sales-payload.module.code.ts"

const DEFAULTS: SalesPayload = { version: 1, sales: {} }

export const SALES_CAPTURE_DESCRIPTOR: CaptureDescriptor<SalesPayload> = {
  addonName: "TemperSales",
  savedVariablesName: "TemperSales_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
