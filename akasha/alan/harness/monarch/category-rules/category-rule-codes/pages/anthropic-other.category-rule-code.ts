import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const anthropicOther = {
  id: "01a0655b-fccf-7006-ac32-badc9a970055",
  pageTypeSlug: "category-rule-code",
  slug: "anthropic-other",
  title: "Anthropic other",
  matches: [
    { key: "merchant", comparison: "is", values: ["anthropic"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
