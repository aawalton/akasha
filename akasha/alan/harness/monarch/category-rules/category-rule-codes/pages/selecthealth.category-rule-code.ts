import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const selecthealth = {
  id: "01a0655b-fcd1-700b-938e-435597c20230",
  pageTypeSlug: "category-rule-code",
  slug: "selecthealth",
  title: "Selecthealth",
  matches: [
    { key: "merchant", comparison: "is", values: ["selecthealth"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "medical",
} as const satisfies CategoryRuleCode
