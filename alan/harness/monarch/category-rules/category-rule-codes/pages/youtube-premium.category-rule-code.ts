import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const youtubePremium = {
  id: "01a0655b-fcdb-700a-88e6-78785704a69c",
  pageTypeSlug: "category-rule-code",
  slug: "youtube-premium",
  title: "Youtube premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["youtube premium"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "shopping",
} as const satisfies CategoryRuleCode
