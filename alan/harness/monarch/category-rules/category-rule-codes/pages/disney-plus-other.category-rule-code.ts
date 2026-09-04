import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const disneyPlusOther = {
  id: "01a0655b-fcd0-700c-b2b3-cb24128d5938",
  pageTypeSlug: "category-rule-code",
  slug: "disney-plus-other",
  title: "Disney plus other",
  matches: [
    { key: "merchant", comparison: "is", values: ["disney plus"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
