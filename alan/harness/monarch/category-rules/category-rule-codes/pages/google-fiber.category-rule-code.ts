import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const googleFiber = {
  id: "01a0655b-fcd0-7016-a872-c983e8fc6fc2",
  pageTypeSlug: "category-rule-code",
  slug: "google-fiber",
  title: "Google fiber",
  matches: [
    { key: "merchant", comparison: "is", values: ["google fiber"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "utilities",
} as const satisfies CategoryRuleCode
