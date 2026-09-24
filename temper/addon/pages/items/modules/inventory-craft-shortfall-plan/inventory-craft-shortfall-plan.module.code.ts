import type { RequiredSkill } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-required-skill/writ-required-skill.module.code.ts"
import { computeCraftIterations } from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-iterations/inventory-writ-crafting-iterations.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { computeBuyShortfall } from "akasha/temper/items/rules/core/modules/buy-rule-eval/buy-rule-eval.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"

export interface StoredCount {
  readonly locationKey: string
  readonly count: number
}

export interface PassiveNeed {
  readonly passive: string
  readonly have: number
  readonly need: number
}

export interface CraftMakes {
  readonly craftType: number
  readonly categoryIds: readonly string[]
}

export function craftShortfallTarget(
  chain: DestinationChain | undefined,
  eligibleCharacters: number
): number | undefined {
  if (chain === undefined) return undefined
  const plan = planStockChainVisit(chain)
  if (plan === undefined) return undefined
  let target = plan.fillTargetQuantity * eligibleCharacters
  for (const tier of plan.surplusCascade) {
    if (tier.cap !== undefined) target += tier.cap
  }
  return target
}

export function countsTowardHeld(locationKey: string, currentCharId: string): boolean {
  const kind = classifyLocation(locationKey)
  if (kind === "character") return locationKey !== currentCharId
  return kind === "housing-storage"
}

export function heldAccountWide(
  liveCharacter: number,
  liveBank: number,
  stored: readonly StoredCount[],
  currentCharId: string
): number {
  let held = liveCharacter + liveBank
  for (const one of stored) {
    if (countsTowardHeld(one.locationKey, currentCharId)) held += one.count
  }
  return held
}

export function craftsToFill(
  target: number,
  held: number,
  yieldPerCraft: number,
  maxCrafts: number
): number {
  return computeCraftIterations(computeBuyShortfall(target, held), yieldPerCraft, maxCrafts)
}

export function yieldPassive(this: void, skill: RequiredSkill): PassiveNeed {
  skill.IsMaxxed()
  return { passive: skill.Name(), have: skill._have ?? 0, need: skill._max ?? 0 }
}

export function firstUnmetPassive(needs: readonly PassiveNeed[]): PassiveNeed | undefined {
  for (const one of needs) {
    if (one.have < one.need) return one
  }
  return undefined
}

export function passiveRefusal(ruleName: string, unmet: PassiveNeed): string {
  return `${ruleName}: crafted nothing, since ${unmet.passive} is rank ${unmet.have} and the craft needs rank ${unmet.need}`
}

export function resolverForStation<R extends CraftMakes>(
  resolvers: readonly R[],
  stationType: number
): R | undefined {
  for (const one of resolvers) {
    if (one.craftType === stationType) return one
  }
  return undefined
}

function holds(chain: readonly string[], id: string): boolean {
  for (const one of chain) {
    if (one === id) return true
  }
  return false
}

export function craftMakesCategory(
  ruleCategoryId: string,
  craftCategoryIds: readonly string[],
  ancestorsOf: (categoryId: string) => readonly string[]
): boolean {
  const ruleAncestors = ancestorsOf(ruleCategoryId)
  for (const made of craftCategoryIds) {
    if (holds(ancestorsOf(made), ruleCategoryId)) return true
    if (holds(ruleAncestors, made)) return true
  }
  return false
}
