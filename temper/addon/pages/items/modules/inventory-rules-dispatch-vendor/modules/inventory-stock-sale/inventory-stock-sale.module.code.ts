import {
  forEachPendingAction,
  getCompiledConfig,
  getPendingRuleIndex,
  getPendingTargetQuantity,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { chainFillCharacters } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  computeStockTierSale,
  stockHandOff,
} from "akasha/temper/addon/pages/items/modules/inventory-stock-deposit-decision/inventory-stock-deposit-decision.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { VENDOR_DESTINATION } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

interface StockSaleTarget {
  readonly bagId: number
  readonly slotIndex: number
  readonly link: string
  readonly ruleIndex: number
  readonly stackCount: number
  readonly sellCount: number
}

interface StockGroup {
  readonly ruleIndex: number
  readonly selfTarget: number
  readonly itemIds: LuaMap<number, true>
  readonly slots: { readonly slotIndex: number; readonly stackCount: number }[]
  backpackCount: number
}

function heldAt(keys: readonly string[], itemIds: LuaMap<number, true>): number {
  const locations = getDatabase().locations
  let count = 0
  for (const key of keys) {
    const location = locations[key]
    if (location === undefined) continue
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (itemIds.has(item.itemId)) count += item.stackCount
      }
    }
  }
  return count
}

function bankKeys(): string[] {
  const keys: string[] = []
  for (const key of Object.keys(getDatabase().locations)) {
    if (classifyLocation(key) === "bank") keys.push(key)
  }
  return keys
}

function stockSaleOf(group: StockGroup, currentCharId: string): number {
  const chain = getCompiledConfig()?.orderedRules[group.ruleIndex]?.destinationChain
  if (chain === undefined) return 0
  if (chain[chain.length - 1]?.destination !== VENDOR_DESTINATION) return 0
  const plan = planStockChainVisit(chain)
  if (plan === undefined) return 0
  let tierCap = 0
  let tierHeld = 0
  for (const tier of plan.surplusCascade) {
    if (tier.destination === VENDOR_DESTINATION) break
    if (tier.cap === undefined) return 0
    tierCap += tier.cap
    if (tier.destination === "bank") tierHeld += heldAt(bankKeys(), group.itemIds)
  }
  const heldByOthers: number[] = []
  for (const charId of chainFillCharacters(plan)) {
    if (charId !== currentCharId) heldByOthers.push(heldAt([charId], group.itemIds))
  }
  return computeStockTierSale({
    backpackCount: group.backpackCount,
    selfTarget: group.selfTarget,
    tierCap,
    tierHeld,
    handOff: stockHandOff(plan.fillTargetQuantity, heldByOthers),
  })
}

function stockGroupsInBackpack(): LuaMap<number, StockGroup> {
  const groups = new LuaMap<number, StockGroup>()
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "stock" || bagId !== BAG_BACKPACK) return
    if (IsItemStolen(bagId, slotIndex)) return
    const ruleIndex = getPendingRuleIndex(bagId, slotIndex)
    if (ruleIndex === undefined) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    let group = groups.get(ruleIndex)
    if (group === undefined) {
      group = {
        ruleIndex,
        selfTarget: getPendingTargetQuantity(bagId, slotIndex) ?? 0,
        itemIds: new LuaMap<number, true>(),
        slots: [],
        backpackCount: 0,
      }
      groups.set(ruleIndex, group)
    }
    group.itemIds.set(GetItemLinkItemId(GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)), true)
    group.slots.push({ slotIndex, stackCount })
    group.backpackCount += stackCount
  })
  return groups
}

export function stockSaleTargets(currentCharId: string): StockSaleTarget[] {
  const targets: StockSaleTarget[] = []
  for (const [, group] of stockGroupsInBackpack()) {
    let left = stockSaleOf(group, currentCharId)
    if (left <= 0) continue
    table.sort(group.slots, function (this: void, a, b): boolean {
      return a.stackCount < b.stackCount
    })
    for (const slot of group.slots) {
      if (left <= 0) break
      const sellCount = math.min(slot.stackCount, left)
      targets.push({
        bagId: BAG_BACKPACK,
        slotIndex: slot.slotIndex,
        link: GetItemLink(BAG_BACKPACK, slot.slotIndex, LINK_STYLE_BRACKETS),
        ruleIndex: group.ruleIndex,
        stackCount: slot.stackCount,
        sellCount,
      })
      left -= sellCount
    }
  }
  return targets
}
