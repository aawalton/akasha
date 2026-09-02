import type { CaptureDescriptor } from "@akasha/temper-capture-descriptor/descriptor"
import type { ErrorsPayload } from "../errors-payload/errors-payload.module.code.ts"

const DEFAULTS: ErrorsPayload = { version: 1, entries: [] }

export const ERRORS_CAPTURE_DESCRIPTOR: CaptureDescriptor<ErrorsPayload> = {
  addonName: "TemperErrors",
  savedVariablesName: "TemperErrors_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
