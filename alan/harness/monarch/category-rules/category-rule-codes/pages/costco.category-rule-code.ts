import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const costco = {
  id: "01a0655b-fcd0-7007-8b72-8cd73bd8390d",
  pageTypeSlug: "category-rule-code",
  slug: "costco",
  title: "Costco",
  matches: [{ key: "merchant", comparison: "is", values: ["costco"] }],
} as const satisfies CategoryRuleCode
