import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { renderThresholdLabel } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.merchantValue
const readOp = (c: CategoryRule["conditions"]): ComparisonOpId | undefined => c?.merchantValueOp

export const MERCHANT_VALUE_FILTER: InventoryRuleFilter = {
  id: "merchant-value",
  label: "Merchant Value",
  priority: 8,
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
  applyDefault: () => ({ merchantValue: 50 }),
  clear: () => ({ merchantValue: undefined, merchantValueOp: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const op = readOp(c)
    return op !== undefined ? { merchantValue: v, merchantValueOp: op } : { merchantValue: v }
  },
}
