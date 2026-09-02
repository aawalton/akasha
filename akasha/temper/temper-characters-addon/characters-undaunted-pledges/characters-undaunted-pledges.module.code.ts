import { TEMPER_DUNGEONS, TEMPER_QUEST_GIVERS } from "@akasha/temper-dungeons/dungeon-data"
import type { TodaysPledge } from "@akasha/temper-dungeons/pledge-rotation"
import { getTodaysPledges as rotationTodaysPledges } from "@akasha/temper-dungeons/pledge-rotation"
import { getSoloDifficulty } from "@akasha/temper-dungeons/solo-difficulty"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export type UndauntedPledge = TodaysPledge

export function getTodaysPledges(): readonly UndauntedPledge[] {
  return rotationTodaysPledges(TEMPER_DUNGEONS, TEMPER_QUEST_GIVERS, GetTimeStamp())
}

export function filterPledgesForCharacter(
  pledges: readonly UndauntedPledge[]
): readonly UndauntedPledge[] {
  const charEntry = currentCharacterEntry()
  const filtered: UndauntedPledge[] = []

  for (const pledge of pledges) {
    const difficulty = getSoloDifficulty(TEMPER_DUNGEONS, pledge.dungeonKey)
    if (difficulty === "hard" || difficulty === "impossible") continue

    const earned = charEntry?.skillPoints?.groupDungeons[pledge.dungeonKey]
    if (earned !== undefined && earned > 0) continue

    filtered.push(pledge)
  }

  return filtered
}
