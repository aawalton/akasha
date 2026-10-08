import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const netflix = {
  id: "01a0655b-fcd0-7028-875b-bda971334f92",
  type: "page-type/category-rule-code",
  slug: "netflix",
  title: "Netflix",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/shopping",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
