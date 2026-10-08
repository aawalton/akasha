import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const appleDeveloperProgram = {
  id: "01a0655b-fccf-7008-ab16-645cc6b24302",
  type: "page-type/category-rule-code",
  slug: "apple-developer-program",
  title: "Apple developer program",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is", values: ["-106.36"] },
  ],
  category: "monarch-category/alans-spending",
  ruleNote: "Apple Developer Program annual membership",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
