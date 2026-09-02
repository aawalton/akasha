import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const KNOWN_ELIGIBLE_ROOTS = new Set(["recipes", "monster-trophies", "rare-fish"])

export const KNOWN_OPTIONS: FilterOption[] = [
  { value: "known", label: "Is Known" },
  { value: "not-known", label: "Is Not Known" },
]

const read = (c: CategoryRule["conditions"]) => c?.known

export const KNOWN_FILTER: InventoryRuleFilter = {
  id: "known",
  label: "Known Status",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, KNOWN_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ known: "known" }),
  clear: () => ({ known: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { known: v } : {}
  },
}
