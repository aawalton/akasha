import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const walmart = {
  id: "01a0655b-fcdb-7008-a57e-b30449a39b95",
  pageTypeSlug: "category-rule-code",
  slug: "walmart",
  title: "Walmart",
  matches: [{ key: "merchant", comparison: "is", values: ["walmart"] }],
} as const satisfies CategoryRuleCode
