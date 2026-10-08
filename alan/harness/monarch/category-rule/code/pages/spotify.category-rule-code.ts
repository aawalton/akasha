import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const spotify = {
  id: "01a0655b-fcda-7001-8247-1a8ffd271881",
  type: "page-type/category-rule-code",
  slug: "spotify",
  title: "Spotify",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "on-or-after", values: ["2025-08-08"] },
  ],
  category: "monarch-category/alans-spending",
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
