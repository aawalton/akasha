import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const amazonStoreCardPayment = {
  id: "01a0655b-fccf-7004-9bc4-26a5a5aab421",
  type: "page-type/category-rule-code",
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
  category: "monarch-category/transfer",
  counterpartWithinDays: 7,
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
