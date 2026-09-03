import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const ecoshieldPestControl = {
  id: "01a0655b-fcd0-700e-a536-7335d0b91eac",
  pageTypeSlug: "category-rule-code",
  slug: "ecoshield-pest-control",
  title: "Ecoshield pest control",
  matches: [{ key: "merchant", comparison: "is", values: ["ecoshield"] }],
  categorySlug: "house",
} as const satisfies CategoryRuleCode
