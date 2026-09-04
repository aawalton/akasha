import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const fastOfferingOther = {
  id: "01a0655b-fcd0-7011-af9e-54ad987ae522",
  pageTypeSlug: "category-rule-code",
  slug: "fast-offering-other",
  title: "Fast offering other",
  matches: [
    { key: "merchant", comparison: "is", values: ["fast offering"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
