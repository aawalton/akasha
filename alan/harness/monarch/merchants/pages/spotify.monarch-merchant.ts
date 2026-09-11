import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const spotify = {
  id: "01a0655b-fcdc-7029-bcca-58cde4310aad",
  type: "monarch-merchant",
  slug: "spotify",
  title: "spotify",
  merchantPatterns: ["spotify"],
} as const satisfies MonarchMerchant
