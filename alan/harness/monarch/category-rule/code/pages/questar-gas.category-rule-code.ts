import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const questarGas = {
  id: "01a0655b-fcd1-7007-afd0-00c18223dfa3",
  type: "page-type/category-rule-code",
  slug: "questar-gas",
  title: "Questar gas",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is", values: ["7151"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/utilities",
  ruleNote: "Natural gas bill",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
