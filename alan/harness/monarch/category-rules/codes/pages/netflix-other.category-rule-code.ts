import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const netflixOther = {
  id: "01a0655b-fcd0-7027-8cda-6c4e878677fd",
  pageTypeSlug: "category-rule-code",
  slug: "netflix-other",
  title: "Netflix other",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
