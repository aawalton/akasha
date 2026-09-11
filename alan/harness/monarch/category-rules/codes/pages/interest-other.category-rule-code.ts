import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const interestOther = {
  id: "01a0655b-fcd0-7019-b63f-f09c40357e8e",
  type: "category-rule-code",
  slug: "interest-other",
  title: "Interest other",
  matches: [
    { key: "merchant", comparison: "is", values: ["interest"] },
    { key: "account", comparison: "is-not", values: ["2749"] },
  ],
} as const satisfies CategoryRuleCode
