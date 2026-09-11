import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const netflix = {
  id: "01a0655b-fcd0-7028-875b-bda971334f92",
  type: "category-rule-code",
  slug: "netflix",
  title: "Netflix",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "shopping",
} as const satisfies CategoryRuleCode
