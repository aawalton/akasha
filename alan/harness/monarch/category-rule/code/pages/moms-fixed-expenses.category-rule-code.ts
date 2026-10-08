import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const momsFixedExpenses = {
  id: "01a0655b-fcd0-7026-9ada-ae8a4c287ed9",
  type: "page-type/category-rule-code",
  slug: "moms-fixed-expenses",
  title: "Moms fixed expenses",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/ann-rent-assistance",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
