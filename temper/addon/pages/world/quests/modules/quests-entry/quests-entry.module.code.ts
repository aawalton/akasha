import { registerAutoQuestEvents } from "akasha/temper/addon/pages/world/quests/modules/quests-auto-quest/quests-auto-quest.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/world/quests/modules/quests-slash-command/quests-slash-command.module.code.ts"

export function initQuests(this: void): undefined {
  initializeSavedVariables()
  registerAutoQuestEvents()
  registerSlashCommands()
  return undefined
}
