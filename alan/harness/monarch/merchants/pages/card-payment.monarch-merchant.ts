import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const cardPayment = {
  id: "01a0655b-fcdc-7008-ab46-f56457fe75ef",
  pageTypeSlug: "monarch-merchant",
  slug: "card-payment",
  title: "card payment",
  merchantPatterns: ["automatic payment", "payment thank you", "credit card payment", "autopay"],
} as const satisfies MonarchMerchant
