import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const selecthealthOther = {
  id: "01a0655b-fcd1-700a-831f-ef070d583eae",
  pageTypeSlug: "category-rule-code",
  slug: "selecthealth-other",
  title: "Selecthealth other",
  matches: [
    { key: "merchant", comparison: "is", values: ["selecthealth"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
