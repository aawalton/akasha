import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const brightPediatricDentistryOther = {
  id: "01a0655b-fccf-700c-9700-31f4a3f22e47",
  pageTypeSlug: "category-rule-code",
  slug: "bright-pediatric-dentistry-other",
  title: "Bright pediatric dentistry other",
  matches: [
    { key: "merchant", comparison: "is", values: ["bright pediatric dentistry"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
