import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const venmoOtherAccount = {
  id: "01a0655b-fcdb-7005-a285-e4482329b9e9",
  pageTypeSlug: "category-rule-code",
  slug: "venmo-other-account",
  title: "Venmo other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is-not", values: ["4042", "7151"] },
  ],
} as const satisfies CategoryRuleCode
