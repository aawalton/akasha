import "akasha/temper/addon/type/temper-quests-global/temper-quests-global.type-declaration.d.ts"

import {
  toggleAutoQuest,
  toggleAutoQuestDebug,
} from "akasha/temper/addon/pages/world/modules/quests-auto-quest/quests-auto-quest.module.code.ts"

globalThis.TemperQuests = {
  ToggleAutoQuest: toggleAutoQuest,
  ToggleAutoQuestDebug: toggleAutoQuestDebug,
}
