import "../quests-public-api/quests-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { registerAutoQuestEvents } from "../quests-auto-quest/quests-auto-quest.module.code.ts"
import { ADDON_NAME } from "../quests-constants/quests-constants.module.code.ts"
import { initializeSavedVariables } from "../quests-saved-variables/quests-saved-variables.module.code.ts"
import { registerSlashCommands } from "../quests-slash-commands/quests-slash-commands.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerAutoQuestEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
