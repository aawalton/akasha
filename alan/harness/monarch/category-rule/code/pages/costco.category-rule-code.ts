import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const costco = {
  id: "01a0655b-fcd0-7007-8b72-8cd73bd8390d",
  type: "page-type/category-rule-code",
  slug: "costco",
  title: "Costco",
  matches: [{ key: "merchant", comparison: "is", values: ["costco"] }],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
