import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const cashPlusSweep = {
  id: "01a0655b-fccf-7014-bdf3-198339e8db63",
  type: "page-type/category-rule-code",
  slug: "cash-plus-sweep",
  title: "Cash plus sweep",
  matches: [
    { key: "merchant", comparison: "is", values: ["cash plus sweep"] },
    { key: "account", comparison: "is", values: ["2749"] },
  ],
  category: "monarch-category/transfer",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
