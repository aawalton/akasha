import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const intermountainHealthcare = {
  id: "01a0655b-fcd0-701a-8125-91344980cde5",
  pageTypeSlug: "category-rule-code",
  slug: "intermountain-healthcare",
  title: "Intermountain healthcare",
  matches: [
    { key: "merchant", comparison: "is", values: ["intermountain"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "medical",
} as const satisfies CategoryRuleCode
