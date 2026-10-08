import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const venmoCashOut = {
  id: "01a0655b-fcdb-7004-a0e8-2eabacb1cfc0",
  type: "page-type/category-rule-code",
  slug: "venmo-cash-out",
  title: "Venmo cash out",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transfer",
  counterpartWithinDays: 7,
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
