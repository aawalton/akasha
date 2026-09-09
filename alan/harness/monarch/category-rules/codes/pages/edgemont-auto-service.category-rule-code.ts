import type { CategoryRuleCode } from "../category-rule-code.page-type.types.ts"

export const edgemontAutoService = {
  id: "01a0655b-fcd0-7010-81cb-5ba1dd5c5529",
  pageTypeSlug: "category-rule-code",
  type: "category-rule-code",
  slug: "edgemont-auto-service",
  title: "Edgemont auto service",
  matches: [
    { key: "merchant", comparison: "is", values: ["edgemont auto"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "transportation",
} as const satisfies CategoryRuleCode
