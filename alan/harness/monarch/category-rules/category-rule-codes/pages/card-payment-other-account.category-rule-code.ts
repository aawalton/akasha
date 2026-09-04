import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cardPaymentOtherAccount = {
  id: "01a0655b-fccf-7011-baa5-2b6cad87d0f9",
  pageTypeSlug: "category-rule-code",
  slug: "card-payment-other-account",
  title: "Card payment other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment"] },
    { key: "account", comparison: "is-not", values: ["6952", "7882", "1425"] },
  ],
} as const satisfies CategoryRuleCode
