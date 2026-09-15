import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const fastOffering = {
  id: "01a0655b-fcd0-7012-9c65-786d859f539d",
  type: "category-rule-code",
  slug: "fast-offering",
  title: "Fast offering",
  matches: [
    { key: "merchant", comparison: "is", values: ["fast offering"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/fast-offering",
} as const satisfies CategoryRuleCode
