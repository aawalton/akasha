import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const royalRoadJoseph = {
  id: "01a0655b-fcd1-7009-bfe5-693e50a46eca",
  type: "page-type/category-rule-code",
  slug: "royal-road-joseph",
  title: "Royal road joseph",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "month", comparison: "is", values: ["september"] },
  ],
  category: "monarch-category/kids-learning",
  ruleNote: "Royal Road annual subscription — Joseph's",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
