import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const disneyPlusOther = {
  id: "01a0655b-fcd0-700c-b2b3-cb24128d5938",
  type: "category-rule-code",
  slug: "disney-plus-other",
  title: "Disney plus other",
  matches: [
    { key: "merchant", comparison: "is", values: ["disney plus"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
