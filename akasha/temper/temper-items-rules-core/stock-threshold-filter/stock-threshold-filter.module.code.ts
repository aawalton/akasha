import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const STOCK_THRESHOLD_OPTIONS: FilterOption[] = [
  { value: "10", label: "10 per character" },
  { value: "25", label: "25 per character" },
  { value: "50", label: "50 per character" },
  { value: "100", label: "100 per character" },
  { value: "200", label: "200 per character" },
  { value: "500", label: "500 per character" },
]

const read = (c: CategoryRule["conditions"]) => c?.stockThreshold

export const STOCK_THRESHOLD_FILTER: InventoryRuleFilter = {
  id: "stock-threshold",
  label: "Stock Threshold",
  priority: 0,
  isEligible: () => {
    return true
  },
  mutuallyExclusive: [],
  isEligibleForAction: () => true,
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? String(v) : undefined
  },
  applyDefault: () => ({ stockThreshold: 200 }),
  clear: () => ({ stockThreshold: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { stockThreshold: v } : {}
  },
}
