import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { renderThresholdLabel } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.value
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.valueOp

export const VALUE_FILTER: InventoryRuleFilter = {
  id: "value",
  label: "Value",
  priority: 7,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    const op = readOp(c)
    const opSuffix = op != null && op !== "<=" ? `(${op})` : ""
    return `${renderThresholdLabel(v)}${opSuffix}`
  },
  applyDefault: () => ({ value: 500 }),
  clear: () => ({ value: undefined, valueOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { value: v, valueOp: op } : { value: v }
  },
}
