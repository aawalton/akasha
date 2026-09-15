import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const venmo = {
  id: "01a0655b-fcdc-7030-98f5-ce9756495e03",
  type: "page-type/monarch-merchant",
  slug: "venmo",
  title: "venmo",
  merchantPatterns: ["venmo"],
} as const satisfies MonarchMerchant
