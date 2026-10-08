import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const disneyPlus = {
  id: "01a0655b-fcd0-700d-aecc-086b85c100c2",
  type: "page-type/category-rule-code",
  slug: "disney-plus",
  title: "Disney plus",
  matches: [
    { key: "merchant", comparison: "is", values: ["disney plus"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/shopping",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
