import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const grandviewFamilyMedicine = {
  id: "01a0655b-fcd0-7018-b77b-b9feb9d69b89",
  type: "page-type/category-rule-code",
  slug: "grandview-family-medicine",
  title: "Grandview family medicine",
  matches: [
    { key: "merchant", comparison: "is", values: ["grandview family medicine"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/medical",
  ruleNote: "Grandview Family Medicine",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
