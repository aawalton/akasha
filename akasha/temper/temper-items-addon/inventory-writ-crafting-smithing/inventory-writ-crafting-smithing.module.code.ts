import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { computeCraftIterations } from "../inventory-writ-crafting-iterations/inventory-writ-crafting-iterations.module.code.ts"
import {
  clearWritCraftQueue,
  type WritCraftRequest,
} from "../inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
export const INDEX_RANGES: Record<number, number> = {
  1: 1,
  2: 8,
  3: 13,
  4: 18,
  5: 23,
  6: 26,
  7: 29,
  8: 32,
  9: 34,
  10: 40,
}

export const JEWELRY_INDEX_RANGES: Record<number, number> = {
  1: 1,
  2: 13,
  3: 26,
  4: 33,
  5: 40,
}

export const DEFAULT_STYLE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 46]

export function selectStyle(patternIdx: number): number {
  let bestStyle = -1
  let bestCount = 0

  for (const styleId of DEFAULT_STYLE_IDS) {
    if (IsSmithingStyleKnown(styleId, patternIdx)) {
      const count = GetCurrentSmithingStyleItemCount(styleId)
      if (count > bestCount) {
        bestCount = count
        bestStyle = styleId
      }
    }
  }

  return bestStyle !== -1 ? bestStyle : 1
}

export function findSmithingMatch(
  questIndex: number,
  conditionIndex: number,
  craftType: number
): { patternIndex: number; materialIndex: number; numMats: number } | undefined {
  const ranges = craftType === CRAFTING_TYPE_JEWELRYCRAFTING ? JEWELRY_INDEX_RANGES : INDEX_RANGES

  for (const [, matIdx] of Object.entries(ranges)) {
    const numPatterns = GetNumSmithingPatterns()

    for (let p = 1; p <= numPatterns; p++) {
      const [, , numMats] = GetSmithingPatternMaterialItemInfo(p, matIdx)
      const resultLink = GetSmithingPatternResultLink(p, matIdx, numMats, 1, 1, LINK_STYLE_DEFAULT)
      if (
        DoesItemLinkFulfillJournalQuestCondition(resultLink, questIndex, 1, conditionIndex, true)
      ) {
        return { patternIndex: p, materialIndex: matIdx, numMats }
      }
    }
  }

  return undefined
}

export function resolveSmithingWrit(
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  const [current, max, , isComplete] = GetJournalQuestConditionValues(questIndex, 1, conditionIndex)
  if (isComplete || current >= max) return undefined
  const needed = max - current

  const craftType = GetCraftingInteractionType()
  const match = findSmithingMatch(questIndex, conditionIndex, craftType)
  if (match === undefined) return undefined

  const { patternIndex, materialIndex, numMats } = match

  return {
    craftType,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) return

      const style = craftType === CRAFTING_TYPE_JEWELRYCRAFTING ? 0 : selectStyle(patternIndex)

      const [maxIter] = GetMaxIterationsPossibleForSmithingItem(
        patternIndex,
        materialIndex,
        numMats,
        style,
        1,
        false
      )
      const iterations = computeCraftIterations(needed, 1, maxIter)
      if (iterations < 1) {
        d(`[${ADDON_NAME}] Not enough materials for writ craft`)
        clearWritCraftQueue()
        return
      }

      CraftSmithingItem(patternIndex, materialIndex, numMats, style, 1, false, iterations)
    },
  }
}
