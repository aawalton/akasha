import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const youtubePremiumOther = {
  id: "01a0655b-fcdb-7009-a568-62d0c147d78d",
  type: "category-rule-code",
  slug: "youtube-premium-other",
  title: "Youtube premium other",
  matches: [
    { key: "merchant", comparison: "is", values: ["youtube premium"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
