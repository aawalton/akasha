import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const standardTransfer = {
  id: "01a0655b-fcdc-702a-8578-11de86ca57f0",
  pageTypeSlug: "monarch-merchant",
  slug: "standard-transfer",
  title: "standard transfer",
  merchantPatterns: ["standard transfer"],
} as const satisfies MonarchMerchant
