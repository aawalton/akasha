import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const costco = {
  id: "01a0655b-fcd0-7007-8b72-8cd73bd8390d",
  type: "category-rule-code",
  slug: "costco",
  title: "Costco",
  matches: [{ key: "merchant", comparison: "is", values: ["costco"] }],
} as const satisfies CategoryRuleCode
