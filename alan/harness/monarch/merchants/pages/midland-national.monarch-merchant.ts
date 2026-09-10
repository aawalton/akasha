import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const midlandNational = {
  id: "01a0655b-fcdc-701f-92c8-685709b616b6",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "midland-national",
  title: "midland national",
  merchantPatterns: ["midland"],
} as const satisfies MonarchMerchant
