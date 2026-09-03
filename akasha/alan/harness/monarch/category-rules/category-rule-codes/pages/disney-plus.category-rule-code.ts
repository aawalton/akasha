import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const disneyPlus = {
  id: "01a0655b-fcd0-700d-aecc-086b85c100c2",
  pageTypeSlug: "category-rule-code",
  slug: "disney-plus",
  title: "Disney plus",
  matches: [
    { key: "merchant", comparison: "is", values: ["disney plus"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "shopping",
} as const satisfies CategoryRuleCode
