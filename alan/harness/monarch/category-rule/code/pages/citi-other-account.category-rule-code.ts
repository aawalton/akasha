import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const citiOtherAccount = {
  id: "01a0655b-fcd0-7000-8ca2-597e60535892",
  type: "page-type/category-rule-code",
  slug: "citi-other-account",
  title: "Citi other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["citi"] },
    { key: "account", comparison: "is-not", values: ["1425"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
