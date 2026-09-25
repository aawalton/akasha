import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import {
  TEMPER_DUNGEONS,
  TEMPER_QUEST_GIVERS,
} from "akasha/temper/catalog/world/group-dungeon/modules/dungeon-data/dungeon-data.module.code.ts"
import type { TodaysPledge } from "akasha/temper/catalog/world/group-dungeon/modules/pledge-rotation/pledge-rotation.module.code.ts"
import { getTodaysPledges as rotationTodaysPledges } from "akasha/temper/catalog/world/group-dungeon/modules/pledge-rotation/pledge-rotation.module.code.ts"
import { getSoloDifficulty } from "akasha/temper/catalog/world/group-dungeon/modules/solo-difficulty/solo-difficulty.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

type UndauntedPledge = TodaysPledge

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
