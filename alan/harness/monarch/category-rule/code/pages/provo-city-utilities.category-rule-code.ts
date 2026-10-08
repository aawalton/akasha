import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const provoCityUtilities = {
  id: "01a0655b-fcd1-7004-a02e-4d9dbf9536d8",
  type: "page-type/category-rule-code",
  slug: "provo-city-utilities",
  title: "Provo city utilities",
  matches: [
    { key: "merchant", comparison: "is", values: ["provo city utilities"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/utilities",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
