import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const CAN_UNLOCK_OPTIONS: FilterOption[] = [
  { value: "can-unlock", label: "Can Unlock" },
  { value: "cannot-unlock", label: "Cannot Unlock" },
]

const read = (c: CategoryRule["conditions"]) => c?.canUnlock

export const CAN_UNLOCK_FILTER: InventoryRuleFilter = {
  id: "can-unlock",
  label: "Can Unlock",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canUnlock: "can-unlock" }),
  clear: () => ({ canUnlock: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canUnlock: v } : {}
  },
}
