import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const chaseOtherAccount = {
  id: "01a0655b-fccf-7015-9c01-bac72d41c9e7",
  type: "page-type/category-rule-code",
  slug: "chase-other-account",
  title: "Chase other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["chase"] },
    { key: "account", comparison: "is-not", values: ["7882"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
