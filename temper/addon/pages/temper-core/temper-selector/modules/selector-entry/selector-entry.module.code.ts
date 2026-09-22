import "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-public-api/selector-public-api.module.code.ts"

import { registerEvents } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-events/selector-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-saved-variables/selector-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-slash-command/selector-slash-command.module.code.ts"

export function initializeSelector(this: void): undefined {
  initializeSavedVariables()
  registerEvents()
  registerSlashCommands()
}
