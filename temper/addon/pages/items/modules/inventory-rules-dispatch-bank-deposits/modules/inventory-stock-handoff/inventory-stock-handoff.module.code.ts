import { LOC_BANK } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { chainFillCharacters } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { LocationData } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import {
  carrierCarryTarget,
  stockHandOff,
} from "akasha/temper/addon/pages/items/modules/inventory-stock-deposit-decision/inventory-stock-deposit-decision.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import { carriesStorage } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"

function storedCount(location: LocationData | undefined, itemId: number): number {
  if (location === undefined) return 0
  let count = 0
  for (const slots of Object.values(location.bags)) {
    for (const item of Object.values(slots)) {
      if (item.itemId === itemId) count += item.stackCount
    }
  }
  return count
}

export function handOffForRule(ruleIndex: number, itemId: number, currentCharId: string): number {
  const chain = getCompiledConfig()?.orderedRules[ruleIndex]?.destinationChain
  const plan = chain === undefined ? undefined : planStockChainVisit(chain)
  if (plan === undefined) return 0
  const locations = getDatabase().locations
  const heldByOthers: number[] = []
  for (const charId of chainFillCharacters(plan)) {
    if (charId === currentCharId) continue
    heldByOthers.push(storedCount(locations[charId], itemId))
  }
  return stockHandOff(plan.fillTargetQuantity, heldByOthers)
}

export function bankHandOff(
  ruleIndex: number | undefined,
  itemId: number,
  currentCharId: string
): number | undefined {
  if (ruleIndex === undefined) return undefined
  const compiled = getCompiledConfig()
  if (!carriesStorage(compiled?.characterPriority, currentCharId)) return undefined
  const chain = compiled?.orderedRules[ruleIndex]?.destinationChain
  const plan = chain === undefined ? undefined : planStockChainVisit(chain)
  if (plan === undefined) return undefined
  if (plan.surplusCascade.some((tier) => tier.destination === "bank")) return undefined
  return handOffForRule(ruleIndex, itemId, currentCharId)
}

export function carrierStockTarget(
  selfTarget: number,
  ruleIndex: number | undefined,
  itemId: number,
  currentCharId: string
): number {
  const handOff = bankHandOff(ruleIndex, itemId, currentCharId)
  if (handOff === undefined) return selfTarget
  const bankHeld = storedCount(getDatabase().locations[LOC_BANK], itemId)
  return carrierCarryTarget(selfTarget, handOff, bankHeld)
}
