import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const brightPediatricDentistry = {
  id: "01a0655b-fccf-700d-8d34-646f76b24ffc",
  type: "page-type/category-rule-code",
  slug: "bright-pediatric-dentistry",
  title: "Bright pediatric dentistry",
  matches: [
    { key: "merchant", comparison: "is", values: ["bright pediatric dentistry"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/medical",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
