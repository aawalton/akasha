import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const paramountPlus = {
  id: "01a0655b-fcdc-7025-af2c-fe962d4f7c13",
  type: "monarch-merchant",
  slug: "paramount-plus",
  title: "paramount plus",
  merchantPatterns: ["paramount"],
} as const satisfies MonarchMerchant
