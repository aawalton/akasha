import { SKILL_LINE_MAX_RANK } from "@akasha/temper-characters-capture-addon/character-capture-skill-line-ranks"
import { resolveSkillPointItemProgress } from "@akasha/temper-player-completion/completion-skill-points-progress"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"

const SKILL_RANK_SORT_WEIGHT = 10_000_000

export function resolveSkillLines(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const skillLines = charData?.skillLineProgress
  if (skillLines === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const lineId = Number(itemPath[0])
    const line = skillLines[lineId]
    if (line === undefined) return undefined
    const maxRank = SKILL_LINE_MAX_RANK[lineId]
    if (maxRank !== undefined && maxRank > 0) {
      const deltaValue = line.currentRank * SKILL_RANK_SORT_WEIGHT + line.currentXP
      return { current: line.currentRank, total: maxRank, deltaValue }
    }
    const maxed = line.nextRankXP === 0
    return { current: maxed ? 1 : 0, total: 1 }
  }

  let current = 0
  let total = 0
  let deltaValue = 0
  for (const [, line] of Object.entries(skillLines)) {
    total++
    if (line.nextRankXP === 0) current++
    deltaValue += line.currentRank * SKILL_RANK_SORT_WEIGHT + line.currentXP
  }
  return { current, total, deltaValue }
}

export function resolveSkillPoints(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  if (itemPath === undefined) return undefined
  return resolveSkillPointItemProgress(charData?.skillPoints, itemPath)
}
