import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const midlandNationalOther = {
  id: "01a0655b-fcd0-7022-9594-d9fc6ce0cf13",
  pageTypeSlug: "category-rule-code",
  slug: "midland-national-other",
  title: "Midland national other",
  matches: [
    { key: "merchant", comparison: "is", values: ["midland national"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
