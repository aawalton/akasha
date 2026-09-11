import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const costco = {
  id: "01a0655b-fcdc-700e-8204-a1d269634adb",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "costco",
  title: "costco",
  merchantPatterns: ["costco"],
} as const satisfies MonarchMerchant
