import { mergeIdList } from "akasha/temper/addon/pages/characters/modules/characters-collector-merge/characters-collector-merge.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

function pushUnlocked(
  categoryIndex: number,
  subCategoryIndex: number | undefined,
  numCollectibles: number,
  unlocked: number[]
): undefined {
  for (let collectibleIndex = 1; collectibleIndex <= numCollectibles; collectibleIndex++) {
    const id = GetCollectibleId(categoryIndex, subCategoryIndex, collectibleIndex)
    if (id === 0) continue
    if (IsCollectibleBlacklisted(id)) continue
    if (GetCollectibleName(id) === "") continue
    if (IsCollectibleUnlocked(id)) {
      unlocked.push(id)
    }
  }
}

function scanUnlockedCollectibles(this: void): number[] {
  const unlocked: number[] = []

  for (let categoryIndex = 1; categoryIndex <= GetNumCollectibleCategories(); categoryIndex++) {
    const [, numSubCategories, numGeneralCollectibles] = GetCollectibleCategoryInfo(categoryIndex)
    pushUnlocked(categoryIndex, undefined, numGeneralCollectibles, unlocked)

    for (let subIndex = 1; subIndex <= numSubCategories; subIndex++) {
      const [, numCollectibles] = GetCollectibleSubCategoryInfo(categoryIndex, subIndex)
      pushUnlocked(categoryIndex, subIndex, numCollectibles, unlocked)
    }
  }

  unlocked.sort((a, b) => a - b)
  return unlocked
}

export function collectCollectibles(this: void): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.collectibles = mergeIdList(
    savedVars.account.collectibles,
    scanUnlockedCollectibles()
  )
}

export function updateCollectible(this: void, collectibleId: number): undefined {
  if (!IsCollectibleUnlocked(collectibleId)) return
  const savedVars = getSavedVariables()
  savedVars.account.collectibles = mergeIdList(savedVars.account.collectibles, [collectibleId])
}

export function refreshAllCollectibles(this: void): undefined {
  getSavedVariables().account.collectibles = scanUnlockedCollectibles()
}
