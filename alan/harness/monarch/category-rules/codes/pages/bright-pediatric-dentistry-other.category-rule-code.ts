import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const brightPediatricDentistryOther = {
  id: "01a0655b-fccf-700c-9700-31f4a3f22e47",
  type: "category-rule-code",
  slug: "bright-pediatric-dentistry-other",
  title: "Bright pediatric dentistry other",
  matches: [
    { key: "merchant", comparison: "is", values: ["bright pediatric dentistry"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
