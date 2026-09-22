import type { ErrorsPayload } from "akasha/temper/capture/error/modules/errors-payload/errors-payload.module.code.ts"
import type { CaptureDescriptor } from "akasha/temper/modules/descriptor/descriptor.module.code.ts"

const DEFAULTS: ErrorsPayload = { version: 1, entries: [] }

export const ERRORS_CAPTURE_DESCRIPTOR: CaptureDescriptor<ErrorsPayload> = {
  addonName: "TemperHud",
  savedVariablesName: "TemperErrors_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
