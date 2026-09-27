import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { alchemyShortfallResolver } from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-alchemy/inventory-craft-shortfall-alchemy.module.code.ts"
import {
  type CraftMakes,
  craftMakesCategory,
  craftsToFill,
  firstUnmetPassive,
  type PassiveNeed,
  passiveRefusal,
  resolverForStation,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import { provisioningShortfallResolver } from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-provisioning/inventory-craft-shortfall-provisioning.module.code.ts"
import { buildEsoEvalEnv } from "akasha/temper/addon/pages/items/modules/inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import { resolvePriceSource } from "akasha/temper/addon/pages/items/modules/inventory-item-data/inventory-item-data.module.code.ts"
import {
  countHeld,
  ruleStockTarget,
  takerFor,
} from "akasha/temper/addon/pages/items/modules/inventory-rule-held/inventory-rule-held.module.code.ts"
import { getAncestorChain } from "akasha/temper/addon/pages/items/modules/inventory-rules-classify/inventory-rules-classify.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  clearWritCraftQueue,
  enqueueWritCraft,
} from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
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
  readonly note?: string
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
  return [provisioningShortfallResolver(), alchemyShortfallResolver()]
}

function say(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

function craftForRule(
  rule: CompiledOrderedRule,
  resolver: CraftShortfallResolver,
  ctx: EvalContext,
  currentCharId: string
): boolean {
  const name = `rule ${rule.id ?? rule.categoryId}`
  const target = ruleStockTarget(rule)
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
      const note = candidate.note === undefined ? "" : `; ${candidate.note}`
      say(
        `${name}: crafting ${candidate.made} ${crafts} time(s) toward ${target}, with ${held} held${note}`
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
