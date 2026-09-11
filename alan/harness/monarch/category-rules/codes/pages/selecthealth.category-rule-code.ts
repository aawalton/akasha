import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const selecthealth = {
  id: "01a0655b-fcd1-700b-938e-435597c20230",
  type: "category-rule-code",
  slug: "selecthealth",
  title: "Selecthealth",
  matches: [
    { key: "merchant", comparison: "is", values: ["selecthealth"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "medical",
} as const satisfies CategoryRuleCode
