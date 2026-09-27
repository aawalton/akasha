import { buildItemFactsForLink } from "akasha/temper/addon/pages/items/modules/inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import {
  countsTowardHeld,
  heldAccountWide,
  type StoredCount,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import { countEligibleCharacters } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import {
  planStockChainVisit,
  stockChainTarget,
} from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import { categoryMatchesItem } from "akasha/temper/items/rules/eval/modules/category-match/category-match.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import { evaluateConditions } from "akasha/temper/items/rules/eval/modules/rule-condition-eval/rule-condition-eval.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export type RuleTakes = (this: void, itemLink: string, stolen: boolean) => boolean

function isOfType(itemTypes: readonly number[] | undefined, itemType: number): boolean {
  if (itemTypes === undefined) return true
  for (const one of itemTypes) {
    if (one === itemType) return true
  }
  return false
}

export function ruleStockTarget(this: void, rule: CompiledOrderedRule): number | undefined {
  const chain = rule.destinationChain
  const leg = chain === undefined ? undefined : planStockChainVisit(chain)
  return stockChainTarget(chain, countEligibleCharacters(leg?.charEligibility))
}

export function takerFor(
  rule: CompiledOrderedRule,
  itemTypes: readonly number[] | undefined,
  ctx: EvalContext
): RuleTakes {
  const seen = new Map<string, boolean>()
  return function (this: void, itemLink: string, stolen: boolean): boolean {
    const key = `${stolen ? "s" : "c"}${itemLink}`
    const held = seen.get(key)
    if (held !== undefined) return held
    const [itemType] = GetItemLinkItemType(itemLink)
    let takes = false
    if (isOfType(itemTypes, itemType)) {
      const facts = { ...buildItemFactsForLink(itemLink), isStolen: stolen }
      takes =
        categoryMatchesItem(rule.categoryId, facts).kind === "match" &&
        evaluateConditions(rule, facts, ctx).kind === "pass"
    }
    seen.set(key, takes)
    return takes
  }
}

function countLive(bagId: number, takes: RuleTakes): number {
  let count = 0
  const size = GetBagSize(bagId)
  for (let slot = 0; slot < size; slot++) {
    const [stack] = GetSlotStackSize(bagId, slot)
    if (stack === 0) continue
    const link = GetItemLink(bagId, slot, LINK_STYLE_BRACKETS)
    if (link !== "" && takes(link, IsItemStolen(bagId, slot))) count += stack
  }
  return count
}

function countStored(
  itemTypes: readonly number[] | undefined,
  takes: RuleTakes,
  currentCharId: string
): StoredCount[] {
  const stored: StoredCount[] = []
  for (const [locationKey, location] of Object.entries(getDatabase().locations)) {
    if (!countsTowardHeld(locationKey, currentCharId)) continue
    let count = 0
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!isOfType(itemTypes, item.itemType)) continue
        if (takes(item.itemLink, item.stolen === true)) count += item.stackCount
      }
    }
    stored.push({ locationKey, count })
  }
  return stored
}

export function countHeld(
  itemTypes: readonly number[] | undefined,
  takes: RuleTakes,
  currentCharId: string
): number {
  const liveBank = countLive(BAG_BANK, takes) + countLive(BAG_SUBSCRIBER_BANK, takes)
  return heldAccountWide(
    countLive(BAG_BACKPACK, takes),
    liveBank,
    countStored(itemTypes, takes, currentCharId),
    currentCharId
  )
}
