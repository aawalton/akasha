import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const adamProffitYardWork = {
  id: "01a0655b-fccf-7000-99ab-d71755fce50c",
  pageTypeSlug: "category-rule-code",
  slug: "adam-proffit-yard-work",
  title: "Adam proffit yard work",
  matches: [{ key: "merchant", comparison: "is", values: ["adam proffit"] }],
  categorySlug: "house",
} as const satisfies CategoryRuleCode
