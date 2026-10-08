import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const lob = {
  id: "01a0655b-fcd0-7021-93a1-94df5d0f1805",
  type: "page-type/category-rule-code",
  slug: "lob",
  title: "Lob",
  matches: [
    { key: "merchant", comparison: "is", values: ["lob"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/alans-spending",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
