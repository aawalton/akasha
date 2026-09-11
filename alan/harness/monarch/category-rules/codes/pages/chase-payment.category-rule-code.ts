import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const chasePayment = {
  id: "01a0655b-fccf-7017-bd88-57a8b4fffb6b",
  type: "category-rule-code",
  slug: "chase-payment",
  title: "Chase payment",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment", "chase"] },
    { key: "account", comparison: "is", values: ["7882"] },
    { key: "sign", comparison: "is", values: ["positive"] },
  ],
  category: "transfer",
  counterpartWithinDays: 7,
} as const satisfies CategoryRuleCode
