import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const venmoTopUp = {
  id: "01a0655b-fcdb-7007-ad7e-4719109a7d45",
  type: "page-type/category-rule-code",
  slug: "venmo-top-up",
  title: "Venmo top up",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is", values: ["4042", "7151"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transfer",
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
