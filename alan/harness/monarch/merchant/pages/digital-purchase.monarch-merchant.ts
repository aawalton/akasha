import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const digitalPurchase = {
  id: "01a0655b-fcdc-7011-b510-748f04bf5dc5",
  type: "page-type/monarch-merchant",
  slug: "digital-purchase",
  title: "digital purchase",
  merchantPatterns: ["digital purchase"],
} as const satisfies MonarchMerchant
