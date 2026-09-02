import type { AchievementCriteriaProgress } from "@akasha/temper-completion/completion-progress"
import type { AccountCompletion } from "@akasha/temper-completion/completion-record"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import {
  getAccountAchievementCategoryMap,
  getCharacterAchievementCategoryMap,
} from "../characters-achievements/characters-achievements.module.code.ts"
import { tallyDone } from "../characters-progress-tally/characters-progress-tally.module.code.ts"

interface AchievementEntry {
  completed: boolean
  criteriaProgress: AchievementCriteriaProgress
}

export function resolveCharacterAchievements(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = charData?.achievements
  if (achievements === undefined) return undefined
  return countAchievements(achievements, itemPath, getCharacterAchievementCategoryMap())
}

export function resolveAccountAchievements(
  account: AccountCompletion,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = account.achievements
  if (achievements === undefined) return undefined
  return countAchievements(achievements, itemPath, getAccountAchievementCategoryMap())
}

export function singleAchievementProgress(entry: AchievementEntry | undefined): TaskProgress {
  if (entry === undefined) return { current: 0, total: 1 }
  const cp = entry.criteriaProgress
  if (cp.criteria !== undefined) {
    const values = Object.values(cp.criteria)
    if (values.length > 0) {
      let current = 0
      let total = 0
      for (const c of values) {
        current += c.numCompleted
        total += c.numRequired
      }
      if (total > 1) return { current, total }
    }
  }
  if (cp.totalSteps <= 1) return { current: entry.completed ? 1 : 0, total: 1 }
  return { current: entry.completed ? cp.totalSteps : 0, total: cp.totalSteps }
}

function countIds(
  achievements: Record<number, AchievementEntry>,
  ids: readonly number[]
): TaskProgress {
  let current = 0
  for (const id of ids) {
    if (achievements[id]?.completed) current++
  }
  return { current, total: ids.length }
}

export function countAchievements(
  achievements: Record<number, AchievementEntry>,
  itemPath: (string | number)[] | undefined,
  categoryMap: Record<string, Record<string, number[]>>
): TaskProgress {
  if (itemPath !== undefined && itemPath.length > 0) {
    if (itemPath.length === 3) {
      return singleAchievementProgress(achievements[Number(itemPath[2])])
    }

    if (itemPath.length === 2) {
      const ids = categoryMap[String(itemPath[0])]?.[String(itemPath[1])]
      if (ids === undefined) return { current: 0, total: 0 }
      return countIds(achievements, ids)
    }

    if (itemPath.length === 1) {
      const subCats = categoryMap[String(itemPath[0])]
      if (subCats === undefined) return { current: 0, total: 0 }
      let current = 0
      let total = 0
      for (const [, ids] of Object.entries(subCats)) {
        const tally = countIds(achievements, ids)
        current += tally.current
        total += tally.total
      }
      return { current, total }
    }
  }

  return tallyDone(achievements, (entry) => entry.completed)
}
