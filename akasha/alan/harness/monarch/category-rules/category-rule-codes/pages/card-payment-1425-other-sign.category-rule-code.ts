import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cardPayment1425OtherSign = {
  id: "01a0655b-fccf-700e-9c49-04a0eb092d17",
  pageTypeSlug: "category-rule-code",
  slug: "card-payment-1425-other-sign",
  title: "Card payment 1425 other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment"] },
    { key: "account", comparison: "is", values: ["1425"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
