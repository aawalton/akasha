import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const costcoCitiPayment = {
  id: "01a0655b-fcd0-7004-a1f9-f1e4c9971491",
  pageTypeSlug: "category-rule-code",
  slug: "costco-citi-payment",
  title: "Costco citi payment",
  matches: [
    { key: "merchant", comparison: "is", values: ["card payment", "citi"] },
    { key: "account", comparison: "is", values: ["1425"] },
    { key: "sign", comparison: "is", values: ["positive"] },
  ],
  categorySlug: "transfer",
  counterpartWithinDays: 7,
} as const satisfies CategoryRuleCode
