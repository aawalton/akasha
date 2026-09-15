import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const standardTransfer = {
  id: "01a0655b-fcdc-702a-8578-11de86ca57f0",
  type: "page-type/monarch-merchant",
  slug: "standard-transfer",
  title: "standard transfer",
  merchantPatterns: ["standard transfer"],
} as const satisfies MonarchMerchant
