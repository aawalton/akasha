import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const costcoGas = {
  id: "01a0655b-fcd0-7006-895e-7ad731347729",
  pageTypeSlug: "category-rule-code",
  slug: "costco-gas",
  title: "Costco gas",
  matches: [
    { key: "merchant", comparison: "is", values: ["costco gas"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "transportation",
} as const satisfies CategoryRuleCode
