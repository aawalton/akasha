import { buildItemFactsForLink } from "akasha/temper/addon/pages/items/modules/inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  type CraftMakes,
  countsTowardHeld,
  craftMakesCategory,
  craftShortfallTarget,
  craftsToFill,
  firstUnmetPassive,
  heldAccountWide,
  type PassiveNeed,
  passiveRefusal,
  resolverForStation,
  type StoredCount,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import { provisioningShortfallResolver } from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-provisioning/inventory-craft-shortfall-provisioning.module.code.ts"
import { buildEsoEvalEnv } from "akasha/temper/addon/pages/items/modules/inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import { resolvePriceSource } from "akasha/temper/addon/pages/items/modules/inventory-item-data/inventory-item-data.module.code.ts"
import { getAncestorChain } from "akasha/temper/addon/pages/items/modules/inventory-rules-classify/inventory-rules-classify.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { countEligibleCharacters } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  clearWritCraftQueue,
  enqueueWritCraft,
} from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
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

export type Takes = (this: void, itemLink: string) => boolean

export interface CraftCandidate {
  readonly made: string
  readonly passives: readonly PassiveNeed[]
  readonly yieldPerCraft: (this: void) => number
  readonly maxCrafts: (this: void) => number
  readonly craft: (this: void, crafts: number) => undefined
}

export type CraftFound =
  | { readonly kind: "found"; readonly candidate: CraftCandidate }
  | { readonly kind: "refused"; readonly why: string }

export interface CraftShortfallResolver extends CraftMakes {
  readonly itemTypes: readonly number[]
  readonly find: (this: void, takes: Takes) => CraftFound
}

function resolvers(this: void): readonly CraftShortfallResolver[] {
  return [provisioningShortfallResolver()]
}

function say(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

function isMadeType(itemTypes: readonly number[], itemType: number): boolean {
  for (const one of itemTypes) {
    if (one === itemType) return true
  }
  return false
}

function takerFor(
  rule: CompiledOrderedRule,
  itemTypes: readonly number[],
  ctx: EvalContext
): (this: void, itemLink: string, stolen: boolean) => boolean {
  const seen = new Map<string, boolean>()
  return function (this: void, itemLink: string, stolen: boolean): boolean {
    const key = `${stolen ? "s" : "c"}${itemLink}`
    const held = seen.get(key)
    if (held !== undefined) return held
    const [itemType] = GetItemLinkItemType(itemLink)
    let takes = false
    if (isMadeType(itemTypes, itemType)) {
      const facts = { ...buildItemFactsForLink(itemLink), isStolen: stolen }
      takes =
        categoryMatchesItem(rule.categoryId, facts).kind === "match" &&
        evaluateConditions(rule, facts, ctx).kind === "pass"
    }
    seen.set(key, takes)
    return takes
  }
}

function countLive(
  bagId: number,
  takes: (this: void, itemLink: string, stolen: boolean) => boolean
): number {
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
  itemTypes: readonly number[],
  takes: (this: void, itemLink: string, stolen: boolean) => boolean,
  currentCharId: string
): StoredCount[] {
  const stored: StoredCount[] = []
  for (const [locationKey, location] of Object.entries(getDatabase().locations)) {
    if (!countsTowardHeld(locationKey, currentCharId)) continue
    let count = 0
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!isMadeType(itemTypes, item.itemType)) continue
        if (takes(item.itemLink, item.stolen === true)) count += item.stackCount
      }
    }
    stored.push({ locationKey, count })
  }
  return stored
}

function countHeld(
  itemTypes: readonly number[],
  takes: (this: void, itemLink: string, stolen: boolean) => boolean,
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

function craftForRule(
  rule: CompiledOrderedRule,
  resolver: CraftShortfallResolver,
  ctx: EvalContext,
  currentCharId: string
): boolean {
  const name = `rule ${rule.id ?? rule.categoryId}`
  const chain = rule.destinationChain
  const leg = chain === undefined ? undefined : planStockChainVisit(chain)
  const target = craftShortfallTarget(chain, countEligibleCharacters(leg?.charEligibility))
  if (target === undefined) {
    say(`${name}: crafted nothing, since its chain has no by-priority leg to count a target from`)
    return false
  }
  const takes = takerFor(rule, resolver.itemTypes, ctx)
  const held = countHeld(resolver.itemTypes, takes, currentCharId)
  if (held >= target) return false
  const found = resolver.find(function (this: void, itemLink: string): boolean {
    return takes(itemLink, false)
  })
  if (found.kind === "refused") {
    say(`${name}: crafted nothing, since ${found.why}`)
    return false
  }
  const candidate = found.candidate
  const unmet = firstUnmetPassive(candidate.passives)
  if (unmet !== undefined) {
    say(passiveRefusal(name, unmet))
    return false
  }
  if (craftsToFill(target, held, candidate.yieldPerCraft(), candidate.maxCrafts()) < 1) {
    say(`${name}: crafted nothing, since the materials on hand make no ${candidate.made}`)
    return false
  }
  enqueueWritCraft({
    craftType: resolver.craftType,
    questIndex: 0,
    conditionIndex: 0,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) return
      const crafts = craftsToFill(target, held, candidate.yieldPerCraft(), candidate.maxCrafts())
      if (crafts < 1) {
        say(`${name}: crafted nothing, since the materials on hand make no ${candidate.made}`)
        clearWritCraftQueue()
        return
      }
      say(
        `${name}: crafting ${candidate.made} ${crafts} time(s) toward ${target}, with ${held} held`
      )
      candidate.craft(crafts)
    },
  })
  return true
}

export function dispatchCraftShortfall(this: void, stationType: number): number {
  const compiled = getCompiledConfig()
  if (compiled === undefined) return 0
  const resolver = resolverForStation(resolvers(), stationType)
  if (resolver === undefined) return 0
  const ctx: EvalContext = {
    env: buildEsoEvalEnv(),
    priceTableMissing: resolvePriceSource() === "ttc-no-table",
  }
  const currentCharId = tostring(GetCurrentCharacterId())
  let enqueued = 0
  for (const rule of compiled.orderedRules) {
    if (rule.craftShortfall !== true || rule.active === false || rule.action !== "stock") continue
    if (!craftMakesCategory(rule.categoryId, resolver.categoryIds, getAncestorChain)) continue
    if (craftForRule(rule, resolver, ctx, currentCharId)) enqueued++
  }
  return enqueued
}
