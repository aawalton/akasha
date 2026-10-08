import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const ecoshieldPestControl = {
  id: "01a0655b-fcd0-700e-a536-7335d0b91eac",
  type: "page-type/category-rule-code",
  slug: "ecoshield-pest-control",
  title: "Ecoshield pest control",
  matches: [{ key: "merchant", comparison: "is", values: ["ecoshield"] }],
  category: "monarch-category/house",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
