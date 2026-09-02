import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const CAN_INSPIRE_ELIGIBLE_ROOTS = new Set(["equipment", "glyphs"])

export const CAN_INSPIRE_OPTIONS: FilterOption[] = [
  { value: "can-inspire", label: "Can Inspire" },
  { value: "cannot-inspire", label: "Cannot Inspire" },
]

const read = (c: CategoryRule["conditions"]) => c?.canInspire

export const CAN_INSPIRE_FILTER: InventoryRuleFilter = {
  id: "can-inspire",
  label: "Can Inspire",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CAN_INSPIRE_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canInspire: "can-inspire" }),
  clear: () => ({ canInspire: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canInspire: v } : {}
  },
}
