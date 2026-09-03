import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cardPayment7882OtherSign = {
  id: "01a0655b-fccf-7010-a3a6-a1f4a2040f08",
  pageTypeSlug: "category-rule-code",
  slug: "card-payment-7882-other-sign",
  title: "Card payment 7882 other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment"] },
    { key: "account", comparison: "is", values: ["7882"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
