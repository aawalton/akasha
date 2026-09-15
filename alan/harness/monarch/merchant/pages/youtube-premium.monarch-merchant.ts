import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const youtubePremium = {
  id: "01a0655b-fcdc-7032-a2d1-18ecefa85092",
  type: "page-type/monarch-merchant",
  slug: "youtube-premium",
  title: "youtube premium",
  merchantPatterns: ["youtubepremium"],
} as const satisfies MonarchMerchant
