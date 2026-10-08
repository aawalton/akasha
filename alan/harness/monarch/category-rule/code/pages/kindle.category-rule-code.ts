import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const kindle = {
  id: "01a0655b-fcd0-701f-a95d-dbdce01bbfed",
  type: "page-type/category-rule-code",
  slug: "kindle",
  title: "Kindle",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-12.88"] },
  ],
  category: "monarch-category/shopping",
  ruleNote: "Kindle subscription",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
