import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { mergeIdList } from "../characters-collector-merge/characters-collector-merge.module.code.ts"

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

export function scanUnlockedCollectibles(this: void): number[] {
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
