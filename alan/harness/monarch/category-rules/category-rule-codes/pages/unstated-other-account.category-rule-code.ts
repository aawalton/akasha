import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const unstatedOtherAccount = {
  id: "01a0655b-fcdb-7000-8f2f-924c8ed5c3c2",
  pageTypeSlug: "category-rule-code",
  slug: "unstated-other-account",
  title: "Unstated other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["unstated"] },
    { key: "account", comparison: "is-not", values: ["6952"] },
  ],
} as const satisfies CategoryRuleCode
