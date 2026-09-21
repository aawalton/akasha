import { currentCharacterEntry } from "akasha/temper/addon/characters-addon/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function collectAllianceRank(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const [avaRank = 0] = GetUnitAvARank("player")
  charEntry.allianceRank = avaRank
}
