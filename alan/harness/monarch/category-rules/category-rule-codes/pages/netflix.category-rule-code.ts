import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const netflix = {
  id: "01a0655b-fcd0-7028-875b-bda971334f92",
  pageTypeSlug: "category-rule-code",
  slug: "netflix",
  title: "Netflix",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "shopping",
} as const satisfies CategoryRuleCode
