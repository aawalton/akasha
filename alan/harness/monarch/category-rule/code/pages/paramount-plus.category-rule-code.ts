import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const paramountPlus = {
  id: "01a0655b-fcd1-7001-91a9-425848dd9140",
  type: "page-type/category-rule-code",
  slug: "paramount-plus",
  title: "Paramount plus",
  matches: [
    { key: "merchant", comparison: "is", values: ["paramount plus"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/shopping",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
