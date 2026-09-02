import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function collectAllianceRank(this: void): undefined {
  const charEntry = getSavedVariables().characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  const [avaRank = 0] = GetUnitAvARank("player")
  charEntry.allianceRank = avaRank
}
