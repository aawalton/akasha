import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

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
