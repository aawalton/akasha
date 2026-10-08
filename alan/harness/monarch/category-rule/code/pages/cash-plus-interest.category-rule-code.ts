import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const cashPlusInterest = {
  id: "01a0655b-fccf-7012-b055-37082357c171",
  type: "page-type/category-rule-code",
  slug: "cash-plus-interest",
  title: "Cash plus interest",
  matches: [
    { key: "merchant", comparison: "is", values: ["interest"] },
    { key: "account", comparison: "is", values: ["2749"] },
  ],
  category: "monarch-category/interest",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
