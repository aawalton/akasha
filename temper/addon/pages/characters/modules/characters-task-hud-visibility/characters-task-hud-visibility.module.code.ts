import { isPermanentlyComplete } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-full-completion/characters-task-hud-full-completion.module.code.ts"
import {
  userCollapsedQuestIds,
  userCollapsedTaskIds,
  userExpandedQuestIds,
  userExpandedTaskIds,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import { resolveTaskProgress } from "akasha/temper/addon/pages/characters/modules/characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"
import {
  getEsoDayStringFromSec,
  getEsoResetTimestampSec,
} from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import {
  getSavedVariables,
  type TaskData,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function isTaskVisible(task: TaskData): boolean {
  if (task.dueDate !== undefined && task.dueDate > getEsoDayStringFromSec(GetTimeStamp())) {
    return false
  }

  if (task.scope === "account") return false
  if (task.scope === "character") {
    return task.esoCharacterId === GetCurrentCharacterId()
  }
  if (task.scope === "next_character") {
    return isCurrentCharacterNext(task)
  }
  const progress = resolveTaskProgress(task)
  return !isPermanentlyComplete({ cardId: task.completionCardId, progress })
}

export function isCurrentCharacterNext(task: TaskData): boolean {
  return task.esoCharacterId === GetCurrentCharacterId()
}

export function isTaskExpanded(taskId: string, completed: boolean): boolean {
  if (userExpandedTaskIds.has(taskId)) return true
  if (userCollapsedTaskIds.has(taskId)) return false
  return !completed
}

export function isQuestExpanded(questKey: string, isAssisted: boolean): boolean {
  if (userExpandedQuestIds.has(questKey)) return true
  if (userCollapsedQuestIds.has(questKey)) return false
  return isAssisted
}

export function isTaskComplete(taskId: string, task: TaskData): boolean {
  const sv = getSavedVariables()
  const key =
    task.scope === "all_characters" || task.scope === "next_character"
      ? `${taskId}:${GetCurrentCharacterId()}`
      : taskId
  const ts = sv.completions[key]
  if (ts === undefined || ts <= 0) return false
  return ts >= getEsoResetTimestampSec(GetTimeStamp())
}

interface DungeonSetsInfo {
  zoneName: string
  incompleteSets: Array<{ name: string; slotsUnlocked: number; totalSlots: number }>
}

export function getDungeonSetsForCurrentZone(): DungeonSetsInfo | undefined {
  const difficulty = GetCurrentZoneDungeonDifficulty()
  if (difficulty === DUNGEON_DIFFICULTY_NONE) return undefined

  const zoneName = zo_strformat("<<1>>", GetUnitZone("player"))
  if (zoneName === "") return undefined

  const itemSets = getSavedVariables().account.itemSets
  if (itemSets === undefined) return undefined

  const incompleteSets: Array<{ name: string; slotsUnlocked: number; totalSlots: number }> = []
  for (const [, setProgress] of Object.entries(itemSets)) {
    if (setProgress === undefined) continue
    if (setProgress.subcategoryName !== zoneName) continue
    if (setProgress.slotsUnlocked >= setProgress.totalSlots) continue
    incompleteSets.push({
      name: setProgress.name,
      slotsUnlocked: setProgress.slotsUnlocked,
      totalSlots: setProgress.totalSlots,
    })
  }

  if (incompleteSets.length === 0) return undefined

  incompleteSets.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return { zoneName, incompleteSets }
}
