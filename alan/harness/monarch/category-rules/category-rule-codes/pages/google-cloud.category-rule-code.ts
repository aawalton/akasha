import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const googleCloud = {
  id: "01a0655b-fcd0-7014-9f0b-5b48e81dbbb0",
  pageTypeSlug: "category-rule-code",
  slug: "google-cloud",
  title: "Google cloud",
  matches: [
    { key: "merchant", comparison: "is", values: ["google cloud"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
