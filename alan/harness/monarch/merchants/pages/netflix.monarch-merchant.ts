import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const netflix = {
  id: "01a0655b-fcdc-7021-960b-b4cd683f9daf",
  type: "monarch-merchant",
  slug: "netflix",
  title: "netflix",
  merchantPatterns: ["netflix"],
} as const satisfies MonarchMerchant
