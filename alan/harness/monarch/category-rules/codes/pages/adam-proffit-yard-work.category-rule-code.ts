import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const adamProffitYardWork = {
  id: "01a0655b-fccf-7000-99ab-d71755fce50c",
  type: "category-rule-code",
  slug: "adam-proffit-yard-work",
  title: "Adam proffit yard work",
  matches: [{ key: "merchant", comparison: "is", values: ["adam proffit"] }],
  category: "house",
} as const satisfies CategoryRuleCode
