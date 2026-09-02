import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function collectAllianceRank(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const [avaRank = 0] = GetUnitAvARank("player")
  charEntry.allianceRank = avaRank
}
