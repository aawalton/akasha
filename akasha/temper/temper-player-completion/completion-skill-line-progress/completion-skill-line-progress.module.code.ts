import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { CharacterSkillMorphProgress } from "@akasha/temper-skill-morphs/morph-progress-types"
import { transformSkillMorphProgress } from "@akasha/temper-skill-morphs-access/character-skill-morph-transform"
import { ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID } from "@akasha/temper-skill-morphs-access/eso-id-helpers"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterSkillLineProgress,
  SkillLineProgressEntry,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export function calculateSkillLinePercent(
  currentRank: number,
  currentXP: number,
  nextRankXP: number,
  maxRank: number
): number {
  if (maxRank === 0 || currentRank >= maxRank) return 100
  const xpFraction = nextRankXP > 0 ? currentXP / nextRankXP : 0
  return ((currentRank + xpFraction) / maxRank) * 100
}

export function transformSkillLineProgress(rows: readonly CompletionCharacterRow[]): {
  progress: readonly CharacterSkillLineProgress[]
  morphProgress: readonly CharacterSkillMorphProgress[]
} {
  const progress: CharacterSkillLineProgress[] = []

  const measuredRows = rows.filter((row) => isCharacterMeasured(row.completion))

  for (const row of measuredRows) {
    const entries: SkillLineProgressEntry[] = []
    const skillLineProgress = row.completion?.skillLineProgress
    if (skillLineProgress) {
      for (const [esoIdStr, slProgress] of Object.entries(skillLineProgress)) {
        const esoId = Number(esoIdStr)
        const skillLineId = ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID.get(esoId)
        if (skillLineId == null) continue

        const sl = skillLines.data[skillLineId]
        if (sl.maxRank === 0) continue

        const percent = calculateSkillLinePercent(
          slProgress.currentRank,
          slProgress.currentXP,
          slProgress.nextRankXP,
          sl.maxRank
        )
        entries.push({
          skillLineId,
          percent,
          currentRank: slProgress.currentRank,
          currentXP: slProgress.currentXP,
          nextRankXP: slProgress.nextRankXP,
          maxRank: sl.maxRank,
        })
      }
    }

    progress.push({ characterId: row.id, entries })
  }

  const morphProgress = transformSkillMorphProgress(measuredRows)

  return { progress, morphProgress }
}
