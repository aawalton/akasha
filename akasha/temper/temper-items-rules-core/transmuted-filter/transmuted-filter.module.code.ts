import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const TRANSMUTED_ELIGIBLE_ROOTS = new Set(["equipment"])

export const TRANSMUTED_OPTIONS: FilterOption[] = [
  { value: "transmuted", label: "Is Transmuted" },
  { value: "not-transmuted", label: "Is Not Transmuted" },
]

const read = (c: CategoryRule["conditions"]) => c?.transmuted

export const TRANSMUTED_FILTER: InventoryRuleFilter = {
  id: "transmuted",
  label: "Transmuted Status",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, TRANSMUTED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ transmuted: "transmuted" }),
  clear: () => ({ transmuted: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { transmuted: v } : {}
  },
}
