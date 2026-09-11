import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const netflixOther = {
  id: "01a0655b-fcd0-7027-8cda-6c4e878677fd",
  type: "category-rule-code",
  slug: "netflix-other",
  title: "Netflix other",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
