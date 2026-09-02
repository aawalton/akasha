import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const LOCATION_OPTIONS: readonly FilterOption[] = [
  { value: "worn", label: "Worn (Equipped)" },
  { value: "backpack", label: "Backpack" },
  { value: "bank", label: "Bank" },
  { value: "craftbag", label: "Craft Bag" },
  { value: "housing-storage", label: "Housing Storage" },
  { value: "house", label: "House" },
  { value: "companion", label: "Companion (Equipped)" },
  { value: "guild", label: "Guild Bank" },
] satisfies readonly { value: InventoryLocationConditionId; label: string }[]

const read = (c: CategoryRule["conditions"]) =>
  c?.location && c.location.length > 0 ? c.location : undefined

export const LOCATION_FILTER: InventoryRuleFilter = {
  id: "location",
  label: "Location",
  priority: 4,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? [...v].sort().join(",") : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ location: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { location: v } : {}
  },
}
