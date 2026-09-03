import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cashPlusInterest = {
  id: "01a0655b-fccf-7012-b055-37082357c171",
  pageTypeSlug: "category-rule-code",
  slug: "cash-plus-interest",
  title: "Cash plus interest",
  matches: [
    { key: "merchant", comparison: "is", values: ["interest"] },
    { key: "account", comparison: "is", values: ["2749"] },
  ],
  categorySlug: "interest",
} as const satisfies CategoryRuleCode
