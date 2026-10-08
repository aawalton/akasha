import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const amazonMusic = {
  id: "01a0655b-fccf-7001-8bf8-3789babaeee5",
  type: "page-type/category-rule-code",
  slug: "amazon-music",
  title: "Amazon music",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-18.26"] },
  ],
  category: "monarch-category/shopping",
  ruleNote: "Amazon Music subscription",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
