import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const royalRoadJoseph = {
  id: "01a0655b-fcd1-7009-bfe5-693e50a46eca",
  pageTypeSlug: "category-rule-code",
  slug: "royal-road-joseph",
  title: "Royal road joseph",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "month", comparison: "is", values: ["september"] },
  ],
  categorySlug: "kids-learning",
  ruleNote: "Royal Road annual subscription — Joseph's",
} as const satisfies CategoryRuleCode
