import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const spotify = {
  id: "01a0655b-fcda-7001-8247-1a8ffd271881",
  pageTypeSlug: "category-rule-code",
  slug: "spotify",
  title: "Spotify",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "on-or-after", values: ["2025-08-08"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
