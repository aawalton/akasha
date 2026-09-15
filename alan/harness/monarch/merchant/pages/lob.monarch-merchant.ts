import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const lob = {
  id: "01a0655b-fcdc-701d-a470-063727f71d17",
  type: "page-type/monarch-merchant",
  slug: "lob",
  title: "lob",
  merchantPatterns: ["lob.com"],
} as const satisfies MonarchMerchant
