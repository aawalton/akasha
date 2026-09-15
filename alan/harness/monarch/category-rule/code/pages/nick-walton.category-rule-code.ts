import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const nickWalton = {
  id: "01a0655b-fcd0-7029-ad52-29d5f4752285",
  type: "page-type/category-rule-code",
  slug: "nick-walton",
  title: "Nick walton",
  matches: [{ key: "merchant", comparison: "is", values: ["nick walton"] }],
} as const satisfies CategoryRuleCode
