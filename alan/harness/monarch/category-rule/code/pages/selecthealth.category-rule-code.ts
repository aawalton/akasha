import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const selecthealth = {
  id: "01a0655b-fcd1-700b-938e-435597c20230",
  type: "page-type/category-rule-code",
  slug: "selecthealth",
  title: "Selecthealth",
  matches: [
    { key: "merchant", comparison: "is", values: ["selecthealth"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/medical",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
