import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const midlandNational = {
  id: "01a0655b-fcdc-701f-92c8-685709b616b6",
  type: "page-type/monarch-merchant",
  slug: "midland-national",
  title: "midland national",
  merchantPatterns: ["midland"],
} as const satisfies MonarchMerchant
