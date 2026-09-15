import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const amazonMusic = {
  id: "01a0655b-fccf-7001-8bf8-3789babaeee5",
  type: "category-rule-code",
  slug: "amazon-music",
  title: "Amazon music",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-18.26"] },
  ],
  category: "monarch-category/shopping",
  ruleNote: "Amazon Music subscription",
} as const satisfies CategoryRuleCode
