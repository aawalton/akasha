import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const stateFarmPremium = {
  id: "01a0655b-fcda-7005-be0b-ebe206a4133d",
  type: "page-type/category-rule-code",
  slug: "state-farm-premium",
  title: "State farm premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["state farm"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/financial",
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
