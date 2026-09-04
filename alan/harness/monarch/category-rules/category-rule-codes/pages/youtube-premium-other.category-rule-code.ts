import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const youtubePremiumOther = {
  id: "01a0655b-fcdb-7009-a568-62d0c147d78d",
  pageTypeSlug: "category-rule-code",
  slug: "youtube-premium-other",
  title: "Youtube premium other",
  matches: [
    { key: "merchant", comparison: "is", values: ["youtube premium"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
