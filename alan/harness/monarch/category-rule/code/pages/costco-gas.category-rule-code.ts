import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const costcoGas = {
  id: "01a0655b-fcd0-7006-895e-7ad731347729",
  type: "page-type/category-rule-code",
  slug: "costco-gas",
  title: "Costco gas",
  matches: [
    { key: "merchant", comparison: "is", values: ["costco gas"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transportation",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
