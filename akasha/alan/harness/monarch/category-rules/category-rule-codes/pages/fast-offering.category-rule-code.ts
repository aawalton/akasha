import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const fastOffering = {
  id: "01a0655b-fcd0-7012-9c65-786d859f539d",
  pageTypeSlug: "category-rule-code",
  slug: "fast-offering",
  title: "Fast offering",
  matches: [
    { key: "merchant", comparison: "is", values: ["fast offering"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "fast-offering",
} as const satisfies CategoryRuleCode
