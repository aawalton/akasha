import "akasha/temper/addon/pages/world/quests/modules/quests-public-api/quests-public-api.module.code.ts"

import { registerAutoQuestEvents } from "akasha/temper/addon/pages/world/quests/modules/quests-auto-quest/quests-auto-quest.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/quests/modules/quests-constants/quests-constants.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/world/quests/modules/quests-slash-command/quests-slash-command.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerAutoQuestEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
