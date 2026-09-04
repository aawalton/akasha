import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const digitalPurchaseOther = {
  id: "01a0655b-fcd0-700b-bdc4-d301652a3037",
  pageTypeSlug: "category-rule-code",
  slug: "digital-purchase-other",
  title: "Digital purchase other",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is-not", values: ["-18.26", "-12.88", "-5.36"] },
  ],
} as const satisfies CategoryRuleCode
