import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const amazon = {
  id: "01a0655b-fccf-7005-93dd-b35019f20d8c",
  pageTypeSlug: "category-rule-code",
  slug: "amazon",
  title: "Amazon",
  matches: [{ key: "merchant", comparison: "is", values: ["amazon"] }],
} as const satisfies CategoryRuleCode
