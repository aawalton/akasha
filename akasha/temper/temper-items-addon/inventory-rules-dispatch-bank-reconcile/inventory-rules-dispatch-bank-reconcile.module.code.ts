import { findMatchedRule } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
export type FrozenStockCounts = LuaMap<number, number>

function stockGroupKey(ruleIndex: number | undefined, itemId: number): number {
  return ruleIndex !== undefined && ruleIndex >= 0 ? ruleIndex : itemId
}

export function freezeStockBackpackCounts(): FrozenStockCounts {
  const counts: FrozenStockCounts = new LuaMap<number, number>()
  const size = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < size; slot++) {
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount === 0) continue
    if (IsItemStolen(BAG_BACKPACK, slot)) continue
    const matched = findMatchedRule(BAG_BACKPACK, slot)
    if (matched === undefined || matched.action !== "stock") continue
    const itemLink = GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS)
    const key = stockGroupKey(matched.ruleIndex, GetItemLinkItemId(itemLink))
    counts.set(key, (counts.get(key) ?? 0) + stackCount)
  }
  return counts
}

export function frozenStockCount(
  frozen: FrozenStockCounts,
  ruleIndex: number | undefined,
  itemId: number
): number {
  return frozen.get(stockGroupKey(ruleIndex, itemId)) ?? 0
}
