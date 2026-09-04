import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const lob = {
  id: "01a0655b-fcd0-7021-93a1-94df5d0f1805",
  pageTypeSlug: "category-rule-code",
  slug: "lob",
  title: "Lob",
  matches: [
    { key: "merchant", comparison: "is", values: ["lob"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
