import "../selector-public-api/selector-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "../selector-constants/selector-constants.module.code.ts"
import { registerEvents } from "../selector-events/selector-events.module.code.ts"
import { initializeSavedVariables } from "../selector-saved-variables/selector-saved-variables.module.code.ts"
import { registerSlashCommands } from "../selector-slash-commands/selector-slash-commands.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
