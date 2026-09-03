import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const amazonStoreCardPayment = {
  id: "01a0655b-fccf-7004-9bc4-26a5a5aab421",
  pageTypeSlug: "category-rule-code",
  slug: "amazon-store-card-payment",
  title: "Amazon store card payment",
  matches: [
    {
      key: "merchant",
      comparison: "is",
      values: ["amazon store card", "card payment", "unstated"],
    },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is", values: ["positive"] },
  ],
  categorySlug: "transfer",
  counterpartWithinDays: 7,
} as const satisfies CategoryRuleCode
