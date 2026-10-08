import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const unstatedOtherAccount = {
  id: "01a0655b-fcdb-7000-8f2f-924c8ed5c3c2",
  type: "page-type/category-rule-code",
  slug: "unstated-other-account",
  title: "Unstated other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["unstated"] },
    { key: "account", comparison: "is-not", values: ["6952"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
