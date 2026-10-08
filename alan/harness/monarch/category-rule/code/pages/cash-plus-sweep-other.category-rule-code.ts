import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const cashPlusSweepOther = {
  id: "01a0655b-fccf-7013-9625-3c4c1fc6db75",
  type: "page-type/category-rule-code",
  slug: "cash-plus-sweep-other",
  title: "Cash plus sweep other",
  matches: [
    { key: "merchant", comparison: "is", values: ["cash plus sweep"] },
    { key: "account", comparison: "is-not", values: ["2749"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
