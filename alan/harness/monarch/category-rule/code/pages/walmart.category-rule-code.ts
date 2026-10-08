import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const walmart = {
  id: "01a0655b-fcdb-7008-a57e-b30449a39b95",
  type: "page-type/category-rule-code",
  slug: "walmart",
  title: "Walmart",
  matches: [{ key: "merchant", comparison: "is", values: ["walmart"] }],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
