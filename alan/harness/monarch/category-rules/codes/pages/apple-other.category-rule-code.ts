import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const appleOther = {
  id: "01a0655b-fccf-7009-ad67-36ad2415b608",
  type: "category-rule-code",
  slug: "apple-other",
  title: "Apple other",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is-not", values: ["-106.36"] },
  ],
} as const satisfies CategoryRuleCode
