import type { CategoryRuleCode } from "../category-rule-code.page-type.types.ts"

export const midlandNationalPremium = {
  id: "01a0655b-fcd0-7023-8289-288ef490604f",
  pageTypeSlug: "category-rule-code",
  type: "category-rule-code",
  slug: "midland-national-premium",
  title: "Midland national premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["midland national"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "financial",
} as const satisfies CategoryRuleCode
