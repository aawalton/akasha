import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const adamProffitYardWork = {
  id: "01a0655b-fccf-7000-99ab-d71755fce50c",
  type: "page-type/category-rule-code",
  slug: "adam-proffit-yard-work",
  title: "Adam proffit yard work",
  matches: [{ key: "merchant", comparison: "is", values: ["adam proffit"] }],
  category: "monarch-category/house",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
