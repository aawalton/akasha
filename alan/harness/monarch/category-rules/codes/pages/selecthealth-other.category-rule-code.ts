import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const selecthealthOther = {
  id: "01a0655b-fcd1-700a-831f-ef070d583eae",
  type: "category-rule-code",
  slug: "selecthealth-other",
  title: "Selecthealth other",
  matches: [
    { key: "merchant", comparison: "is", values: ["selecthealth"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
