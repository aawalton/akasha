import { getActiveQuests } from "akasha/temper/addon/pages/characters/modules/characters-active-quests/characters-active-quests.module.code.ts"
import {
  lastSyncedAssistedName,
  refreshesNoted,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-characters-task-hud-view-global/temper-characters-task-hud-view-global.type-declaration.d.ts"

function questFocuses(this: void): TemperCharactersTaskHudQuestFocus[] {
  const focuses: TemperCharactersTaskHudQuestFocus[] = []
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex += 1) {
    if (!IsValidQuestIndex(questIndex)) continue
    focuses.push({
      journalIndex: questIndex,
      name: GetJournalQuestName(questIndex),
      assistedWithZero: GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex, 0),
      assistedWithNil: GetTrackedIsAssisted(TRACK_TYPE_QUEST, questIndex),
    })
  }
  return focuses
}

export function readTaskHudView(this: void): TemperCharactersTaskHudViewReading | undefined {
  try {
    const refreshes = refreshesNoted()
    return {
      assistedName: getActiveQuests().find((quest) => quest.isAssisted)?.name,
      refreshCount: refreshes.count,
      lastRefreshAt: refreshes.lastAt,
      lastSyncedName: lastSyncedAssistedName(),
      quests: questFocuses(),
    }
  } catch {
    return undefined
  }
}

globalThis.TemperCharactersTaskHudView = { Read: readTaskHudView }
