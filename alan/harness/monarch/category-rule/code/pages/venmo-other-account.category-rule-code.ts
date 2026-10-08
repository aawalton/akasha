import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const venmoOtherAccount = {
  id: "01a0655b-fcdb-7005-a285-e4482329b9e9",
  type: "page-type/category-rule-code",
  slug: "venmo-other-account",
  title: "Venmo other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is-not", values: ["4042", "7151"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
