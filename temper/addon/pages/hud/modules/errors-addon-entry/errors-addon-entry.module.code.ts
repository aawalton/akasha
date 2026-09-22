import {
  flushBuffered,
  registerErrorHooks,
  registerPreInitHooks,
  unregisterPreInitHooks,
} from "akasha/temper/addon/pages/hud/modules/errors-addon-hooks/errors-addon-hooks.module.code.ts"
import { setSavedVariablesAccessor } from "akasha/temper/addon/pages/hud/modules/errors-addon-record/errors-addon-record.module.code.ts"
import { ERRORS_CAPTURE_DESCRIPTOR } from "akasha/temper/capture/error/modules/errors-descriptor/errors-descriptor.module.code.ts"
import { defineCaptureWriter } from "akasha/temper/capture/writer/modules/capture-writer/capture-writer.module.code.ts"

registerPreInitHooks()

defineCaptureWriter(ERRORS_CAPTURE_DESCRIPTOR, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)
  flushBuffered()
  unregisterPreInitHooks()
  registerErrorHooks()
})
