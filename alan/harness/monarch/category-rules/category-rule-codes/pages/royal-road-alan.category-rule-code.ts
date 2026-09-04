import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const royalRoadAlan = {
  id: "01a0655b-fcd1-7008-a59f-dadeb90f0a9b",
  pageTypeSlug: "category-rule-code",
  slug: "royal-road-alan",
  title: "Royal road Alan",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "month", comparison: "is", values: ["july"] },
  ],
  categorySlug: "alans-spending",
  ruleNote: "Royal Road annual subscription — Alan's",
} as const satisfies CategoryRuleCode
