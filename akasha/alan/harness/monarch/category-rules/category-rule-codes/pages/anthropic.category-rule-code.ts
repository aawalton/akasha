import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const anthropic = {
  id: "01a0655b-fccf-7007-9674-c7560dd74719",
  pageTypeSlug: "category-rule-code",
  slug: "anthropic",
  title: "Anthropic",
  matches: [
    { key: "merchant", comparison: "is", values: ["anthropic"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
