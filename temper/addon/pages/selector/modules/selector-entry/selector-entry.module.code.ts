import "akasha/temper/addon/pages/selector/modules/selector-public-api/selector-public-api.module.code.ts"

import { ADDON_NAME } from "akasha/temper/addon/pages/selector/modules/selector-constants/selector-constants.module.code.ts"
import { registerEvents } from "akasha/temper/addon/pages/selector/modules/selector-events/selector-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/selector/modules/selector-saved-variables/selector-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/selector/modules/selector-slash-command/selector-slash-command.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
