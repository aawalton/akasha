import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const crunchyroll = {
  id: "01a0655b-fcd0-700a-9cba-1712b2e2c353",
  pageTypeSlug: "category-rule-code",
  slug: "crunchyroll",
  title: "Crunchyroll",
  matches: [
    { key: "merchant", comparison: "is", values: ["crunchyroll"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "on-or-after", values: ["2026-08-08"] },
  ],
  categorySlug: "shopping",
} as const satisfies CategoryRuleCode
