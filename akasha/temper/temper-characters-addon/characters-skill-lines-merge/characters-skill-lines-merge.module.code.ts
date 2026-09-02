import type { SkillLineProgress } from "@akasha/temper-completion/completion-progress"
import { mergeByKey } from "../characters-keyed-merge/characters-keyed-merge.module.code.ts"

function mergeLine(stored: SkillLineProgress, fresh: SkillLineProgress): SkillLineProgress {
  const advanced = fresh.currentRank >= stored.currentRank ? fresh : stored

  return {
    currentRank: advanced.currentRank,
    currentXP: advanced.currentXP,
    nextRankXP: advanced.nextRankXP,
    skills: stored.skills ?? fresh.skills,
  }
}

export function mergeSkillLineProgress(
  stored: Record<number, SkillLineProgress> | undefined,
  fresh: Record<number, SkillLineProgress>
): Record<number, SkillLineProgress> {
  return mergeByKey(stored, fresh, mergeLine)
}
