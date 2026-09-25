import { mergeMaxByKey } from "akasha/temper/addon/pages/characters/modules/characters-collector-merge/characters-collector-merge.module.code.ts"
import type { SparseAntiquityLore } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

function loreEntriesAcquired(antiquityId: number): number | undefined {
  if (GetNumAntiquityLoreEntries(antiquityId) === 0) return undefined
  const acquired = GetNumAntiquityLoreEntriesAcquired(antiquityId)
  if (acquired === 0) return undefined
  return acquired
}

function scanAntiquityLore(this: void): SparseAntiquityLore {
  const antiquityLore: SparseAntiquityLore = {}

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const acquired = loreEntriesAcquired(antiquityId)
    if (acquired !== undefined) {
      antiquityLore[antiquityId] = acquired
    }
    antiquityId = GetNextAntiquityId(antiquityId)
  }

  return antiquityLore
}

export function collectAntiquityLore(this: void): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.antiquityLore = mergeMaxByKey(
    savedVars.account.antiquityLore,
    scanAntiquityLore()
  )
}

export function updateAntiquityLore(this: void, antiquityId: number): undefined {
  const antiquityLore = getSavedVariables().account.antiquityLore
  if (antiquityLore === undefined) return

  const acquired = loreEntriesAcquired(antiquityId)
  if (acquired === undefined) return
  antiquityLore[antiquityId] = acquired
}

export function refreshAllAntiquityLore(this: void): undefined {
  getSavedVariables().account.antiquityLore = scanAntiquityLore()
}
