import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const kindle = {
  id: "01a0655b-fcd0-701f-a95d-dbdce01bbfed",
  pageTypeSlug: "category-rule-code",
  slug: "kindle",
  title: "Kindle",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-12.88"] },
  ],
  categorySlug: "shopping",
  ruleNote: "Kindle subscription",
} as const satisfies CategoryRuleCode
