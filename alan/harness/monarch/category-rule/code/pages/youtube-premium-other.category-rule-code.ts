import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const youtubePremiumOther = {
  id: "01a0655b-fcdb-7009-a568-62d0c147d78d",
  type: "page-type/category-rule-code",
  slug: "youtube-premium-other",
  title: "Youtube premium other",
  matches: [
    { key: "merchant", comparison: "is", values: ["youtube premium"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
