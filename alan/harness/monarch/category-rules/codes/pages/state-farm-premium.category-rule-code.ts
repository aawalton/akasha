import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const stateFarmPremium = {
  id: "01a0655b-fcda-7005-be0b-ebe206a4133d",
  type: "category-rule-code",
  slug: "state-farm-premium",
  title: "State farm premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["state farm"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "financial",
} as const satisfies CategoryRuleCode
