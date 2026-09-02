import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.itemNamePattern

export const ITEM_NAME_FILTER: InventoryRuleFilter = {
  id: "item-name",
  label: "Item Name",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => {
    const v = read(c)
    return typeof v === "string" && v.trim().length > 0
  },
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined && v.trim().length > 0 ? v : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ itemNamePattern: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { itemNamePattern: v } : {}
  },
}
