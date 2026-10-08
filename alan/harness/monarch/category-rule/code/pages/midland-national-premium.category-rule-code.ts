import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const midlandNationalPremium = {
  id: "01a0655b-fcd0-7023-8289-288ef490604f",
  type: "page-type/category-rule-code",
  slug: "midland-national-premium",
  title: "Midland national premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["midland national"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/financial",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
