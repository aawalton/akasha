import { findMatchedRule } from "akasha/temper/addon/items-addon/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
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
