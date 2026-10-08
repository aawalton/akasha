import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const cardPaymentOtherAccount = {
  id: "01a0655b-fccf-7011-baa5-2b6cad87d0f9",
  type: "page-type/category-rule-code",
  slug: "card-payment-other-account",
  title: "Card payment other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment"] },
    { key: "account", comparison: "is-not", values: ["6952", "7882", "1425"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
