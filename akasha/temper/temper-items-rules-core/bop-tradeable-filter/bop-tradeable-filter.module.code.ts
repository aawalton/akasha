import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const BOP_TRADEABLE_OPTIONS: FilterOption[] = [
  { value: "bop-tradeable", label: "Is BoP-Tradeable" },
  { value: "not-bop-tradeable", label: "Is Not BoP-Tradeable" },
]

const read = (c: CategoryRule["conditions"]) => c?.bopTradeable

export const BOP_TRADEABLE_FILTER: InventoryRuleFilter = {
  id: "bop-tradeable",
  label: "BoP-Tradeable Status",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ bopTradeable: "bop-tradeable" }),
  clear: () => ({ bopTradeable: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { bopTradeable: v } : {}
  },
}
