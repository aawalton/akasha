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
} as const satisfies CategoryRuleCode
