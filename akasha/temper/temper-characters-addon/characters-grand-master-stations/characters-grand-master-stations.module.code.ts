import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function collectGrandMasterStations(craftSkill: number): undefined {
  const account = getSavedVariables().account

  if (account.grandMasterStations === undefined) {
    account.grandMasterStations = {}
  }

  const numSets = GetNumConsolidatedSmithingSets()
  const unlocked: number[] = []
  for (let i = 1; i <= numSets; i++) {
    if (IsConsolidatedSmithingSetIndexUnlocked(i)) {
      unlocked.push(i)
    }
  }

  account.grandMasterStations[craftSkill] = {
    name: zo_strformat("<<1>>", GetCraftingSkillName(craftSkill)),
    unlocked,
  }
}
