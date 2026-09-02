import type { ItemAction, StockScope } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { CharacterId } from "@akasha/temper-items-rules-core/use-destination-types"
import { computeStockGroups } from "@akasha/temper-items-rules-eval/compute-stock-groups"
import type { EvalContext } from "@akasha/temper-items-rules-eval/eval-env"
import { evaluateRule, walkRules } from "@akasha/temper-items-rules-eval/evaluator"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import { recordSettlingMs } from "../inventory-bank-trace/inventory-bank-trace.module.code.ts"
import {
  buildItemFactsForSlot,
  resolveItemKey,
} from "../inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { refreshEquipmentLockOverlays } from "../inventory-equipment-lock-overlay/inventory-equipment-lock-overlay.module.code.ts"
import { buildEsoEvalEnv } from "../inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import { isItemLocked } from "../inventory-item-data/inventory-item-data.module.code.ts"
import {
  getEffectiveItemRuleAction,
  getItemRuleVerdictAction,
} from "../inventory-item-rule-verdict-store/inventory-item-rule-verdict-store.module.code.ts"
import { setItemIsJunkGated } from "../inventory-junk-queue/inventory-junk-queue.module.code.ts"
import { refreshLockOverlays } from "../inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import {
  applyAction,
  clearAllPendingActions,
  clearPendingAction,
  getCompiledConfig,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { dispatchUseActions } from "../inventory-rules-dispatch-use/inventory-rules-dispatch-use.module.code.ts"
import { resolveEntryAllocation } from "../inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { setRescanInventoryRef } from "../inventory-rules-rescan-ref/inventory-rules-rescan-ref.module.code.ts"
import type { UseAllocation } from "../inventory-rules-types/inventory-rules-types.module.code.ts"
export interface MatchedRuleResult {
  ruleIndex: number
  action: ItemAction
  destination: string | undefined
  targetQuantity: number | undefined
  stockScope: StockScope | undefined
  useAllocation: UseAllocation | undefined
}

export function findMatchedRule(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): MatchedRuleResult | undefined {
  const [stackSize] = GetSlotStackSize(bagId, slotIndex)
  if (stackSize === 0) return undefined

  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  if (itemLink === "") return undefined

  const isLocked = isItemLocked(bagId, slotIndex)

  if (!isLocked) {
    const itemId = GetItemLinkItemId(itemLink)
    const verdictAction = getItemRuleVerdictAction(itemId)
    if (verdictAction !== undefined) {
      return {
        ruleIndex: -1,
        action: verdictAction,
        destination: undefined,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    const itemRule = compiled.itemRules[itemId]
    if (itemRule !== undefined) {
      let useItemKey: ItemFacts["itemKey"]
      if (itemRule.action === "use") {
        const [itemType] = GetItemLinkItemType(itemLink)
        useItemKey = resolveItemKey(itemLink, itemType, itemId)
      }
      const resolved = resolveEntryAllocation(itemRule, itemRule.action, itemRule.destination, {
        bagId,
        slotIndex,
        itemKey: useItemKey,
        itemLink,
        claims,
      })
      return {
        ruleIndex: -1,
        action: itemRule.action,
        destination: resolved.destination,
        targetQuantity: resolved.targetQuantity,
        stockScope: itemRule.action === "stock" ? itemRule.stockScope : undefined,
        useAllocation: resolved.useAllocation,
      }
    }
  }

  const facts = buildItemFactsForSlot(bagId, slotIndex)
  if (facts === undefined) return undefined

  const env = buildEsoEvalEnv()
  const ctx: EvalContext = {
    env,
    claimedByCharacter: claims,
    stockGroupByRuleId: stockGroups,
  }

  if (isLocked) {
    const lockedItemId = GetItemLinkItemId(itemLink)
    if (getEffectiveItemRuleAction(lockedItemId, compiled) === "unlock") {
      return {
        ruleIndex: -1,
        action: "unlock",
        destination: undefined,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    for (let i = 0; i < compiled.orderedRules.length; i++) {
      const rule = compiled.orderedRules[i]
      if (rule === undefined) continue
      if (rule.locked !== "locked" || rule.action !== "unlock") continue
      const result = evaluateRule(rule, i, facts, ctx)
      if (result.verdict.kind !== "matched") continue
      return {
        ruleIndex: i,
        action: "unlock",
        destination: result.resolvedDestination ?? rule.destination,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    return undefined
  }

  const trace = walkRules(compiled.orderedRules, facts, ctx)
  if (trace.outcome.kind !== "matched") return undefined

  const matchedIndex = trace.outcome.rule.index
  const compiledRule = compiled.orderedRules[matchedIndex]
  if (compiledRule === undefined) return undefined

  const resolved = resolveEntryAllocation(
    compiledRule,
    trace.outcome.action,
    trace.outcome.destination,
    {
      bagId,
      slotIndex,
      itemKey: facts.itemKey,
      itemLink,
      claims,
    }
  )

  return {
    ruleIndex: matchedIndex,
    action: trace.outcome.action,
    destination: resolved.destination,
    targetQuantity: resolved.targetQuantity,
    stockScope: compiledRule.action === "stock" ? compiledRule.stockScope : undefined,
    useAllocation: resolved.useAllocation,
  }
}

export function evaluateRules(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): undefined {
  const start = GetGameTimeMilliseconds()
  evaluateRulesInner(bagId, slotIndex, claims, stockGroups)
  recordSettlingMs("evaluateRules", GetGameTimeMilliseconds() - start)
}

function evaluateRulesInner(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): undefined {
  clearPendingAction(bagId, slotIndex)

  const matched = findMatchedRule(bagId, slotIndex, claims, stockGroups)
  if (matched === undefined) {
    if (!IsItemPlayerLocked(bagId, slotIndex) && IsItemJunk(bagId, slotIndex)) {
      setItemIsJunkGated(bagId, slotIndex, false)
    }
    return
  }

  if (matched.action === "move-to" && matched.destination !== undefined) {
    if (matched.destination.startsWith("character:")) {
      const charId = matched.destination.substring("character:".length)
      if (
        charId === tostring(GetCurrentCharacterId()) &&
        (bagId === BAG_BACKPACK || bagId === BAG_WORN)
      ) {
        if (IsItemJunk(bagId, slotIndex)) {
          setItemIsJunkGated(bagId, slotIndex, false)
        }
        return
      }
    }
  }

  applyAction(
    bagId,
    slotIndex,
    matched.action,
    matched.destination,
    matched.targetQuantity,
    matched.stockScope,
    matched.ruleIndex,
    matched.useAllocation
  )
  if (matched.action !== "sell" && IsItemJunk(bagId, slotIndex)) {
    setItemIsJunkGated(bagId, slotIndex, false)
  }
}

function computeBackpackStockGroups(): ReadonlyMap<string, ReadonlySet<number>> | undefined {
  const compiled = getCompiledConfig()
  if (compiled === undefined) return undefined

  const corpus: ItemFacts[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    const facts = buildItemFactsForSlot(BAG_BACKPACK, slot)
    if (facts !== undefined) corpus.push(facts)
  }

  const env = buildEsoEvalEnv()
  return computeStockGroups(compiled.orderedRules, corpus, factsIdentity, env)
}

function factsIdentity(facts: ItemFacts): ItemFacts {
  return facts
}

export function rescanInventory(): undefined {
  clearAllPendingActions()
  const claims = new Map<CharacterId, Set<string>>()
  const stockGroups = computeBackpackStockGroups()
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    evaluateRules(BAG_BACKPACK, slot, claims, stockGroups)
  }
  dispatchUseActions()
  fireInventoryActionsChanged()
  refreshLockOverlays()
  refreshEquipmentLockOverlays()
}

export function rescanWornItems(): undefined {
  const claims = new Map<CharacterId, Set<string>>()
  const bagSize = GetBagSize(BAG_WORN)
  for (let slot = 0; slot < bagSize; slot++) {
    evaluateRules(BAG_WORN, slot, claims)
  }
  refreshLockOverlays()
  refreshEquipmentLockOverlays()
}

setRescanInventoryRef(rescanInventory)

export const ACTIONS_CHANGED_DEBOUNCE_MS = 500
export let actionsChangedPending = false

export function fireInventoryActionsChanged(): undefined {
  if (actionsChangedPending) return
  actionsChangedPending = true
  zo_callLater(function (this: void): undefined {
    actionsChangedPending = false
    const start = GetGameTimeMilliseconds()
    CALLBACK_MANAGER.FireCallbacks("Temper_InventoryActionsChanged")
    recordSettlingMs("actionsChanged", GetGameTimeMilliseconds() - start)
  }, ACTIONS_CHANGED_DEBOUNCE_MS)
}
