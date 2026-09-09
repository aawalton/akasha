import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const citiOtherAccount = {
  id: "01a0655b-fcd0-7000-8ca2-597e60535892",
  pageTypeSlug: "category-rule-code",
  slug: "citi-other-account",
  title: "Citi other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["citi"] },
    { key: "account", comparison: "is-not", values: ["1425"] },
  ],
} as const satisfies CategoryRuleCode
