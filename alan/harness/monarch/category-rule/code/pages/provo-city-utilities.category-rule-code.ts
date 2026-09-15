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
} as const satisfies CategoryRuleCode
