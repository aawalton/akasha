import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const venmoOtherSign = {
  id: "01a0655b-fcdb-7006-bb68-0673fa1a2d33",
  type: "page-type/category-rule-code",
  slug: "venmo-other-sign",
  title: "Venmo other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is", values: ["4042", "7151"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
