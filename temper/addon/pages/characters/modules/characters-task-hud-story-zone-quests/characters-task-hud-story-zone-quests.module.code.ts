import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { taskHasCardAndPathEntry } from "akasha/temper/addon/pages/characters/modules/characters-task-card-match/characters-task-card-match.module.code.ts"
import { questCompleted } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-helpers/skill-point-finder-helpers.module.code.ts"
import { RAW_ZONES } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-sources/skill-point-sources.module.code.ts"
import { findFirstIncompleteStoryZone } from "akasha/temper/player/completion/temper-player-completion/modules/completion-story-zone-quests/completion-story-zone-quests.module.code.ts"
import type { TaskData } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const STORY_ZONE_QUESTS_PATH = "storyZoneQuests"

interface StoryZoneQuestEnrichment {
  readonly zoneName: string
  readonly remainingQuests: readonly string[]
  readonly completedQuests: number
  readonly totalQuests: number
}

export function isStoryZoneQuestTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(task, "skill-points", 0, STORY_ZONE_QUESTS_PATH)
}

export function getStoryZoneQuestEnrichment(this: void): StoryZoneQuestEnrichment | undefined {
  const owed = findFirstIncompleteStoryZone(currentCharacterEntry()?.skillPoints?.zoneQuests)
  if (owed === undefined) return undefined

  const raw = RAW_ZONES.find((zone) => zone.key === owed.key)
  if (raw === undefined) return undefined

  const remainingQuests: string[] = []
  for (const questId of raw.quests) {
    if (questCompleted(questId)) continue
    remainingQuests.push(zo_strformat("<<1>>", GetQuestName(questId)))
  }
  if (remainingQuests.length === 0) return undefined

  return {
    zoneName: owed.label,
    remainingQuests,
    completedQuests: owed.completedQuests,
    totalQuests: owed.totalQuests,
  }
}
