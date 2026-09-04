import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const stateFarmPremium = {
  id: "01a0655b-fcda-7005-be0b-ebe206a4133d",
  pageTypeSlug: "category-rule-code",
  slug: "state-farm-premium",
  title: "State farm premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["state farm"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "financial",
} as const satisfies CategoryRuleCode
