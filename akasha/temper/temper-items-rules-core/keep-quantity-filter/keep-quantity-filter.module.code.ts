import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

const OUTBOUND_ACTIONS: ReadonlySet<ItemAction> = new Set([
  "sell",
  "fence-sell",
  "destroy",
  "deconstruct",
  "refine",
  "list",
  "fence-launder",
  "research",
])

export const KEEP_QUANTITY_OPTIONS: FilterOption[] = [1, 5, 10, 20, 50, 100, 200, 500, 1_000].map(
  (v) => ({ value: String(v), label: String(v) })
)

const read = (c: CategoryRule["conditions"]) => c?.keepQuantity

export const KEEP_QUANTITY_FILTER: InventoryRuleFilter = {
  id: "keep-quantity",
  label: "Keep",
  priority: 8,
  isEligible: () => true,
  isEligibleForAction: (action) => OUTBOUND_ACTIONS.has(action),
  mutuallyExclusive: ["target-quantity"],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? String(v) : undefined
  },
  applyDefault: () => ({ keepQuantity: 100 }),
  clear: () => ({ keepQuantity: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { keepQuantity: v } : {}
  },
}
