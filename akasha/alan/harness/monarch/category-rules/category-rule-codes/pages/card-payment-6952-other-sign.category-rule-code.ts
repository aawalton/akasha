import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cardPayment6952OtherSign = {
  id: "01a0655b-fccf-700f-819b-09ee9f67b4d1",
  pageTypeSlug: "category-rule-code",
  slug: "card-payment-6952-other-sign",
  title: "Card payment 6952 other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment"] },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
