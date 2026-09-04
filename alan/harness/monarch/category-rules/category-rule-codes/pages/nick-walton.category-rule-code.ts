import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const nickWalton = {
  id: "01a0655b-fcd0-7029-ad52-29d5f4752285",
  pageTypeSlug: "category-rule-code",
  slug: "nick-walton",
  title: "Nick walton",
  matches: [{ key: "merchant", comparison: "is", values: ["nick walton"] }],
} as const satisfies CategoryRuleCode
