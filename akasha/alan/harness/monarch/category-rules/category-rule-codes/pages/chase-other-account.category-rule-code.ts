import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const chaseOtherAccount = {
  id: "01a0655b-fccf-7015-9c01-bac72d41c9e7",
  pageTypeSlug: "category-rule-code",
  slug: "chase-other-account",
  title: "Chase other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["chase"] },
    { key: "account", comparison: "is-not", values: ["7882"] },
  ],
} as const satisfies CategoryRuleCode
