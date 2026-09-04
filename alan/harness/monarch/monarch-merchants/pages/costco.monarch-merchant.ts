import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const costco = {
  id: "01a0655b-fcdc-700e-8204-a1d269634adb",
  pageTypeSlug: "monarch-merchant",
  slug: "costco",
  title: "costco",
  merchantPatterns: ["costco"],
} as const satisfies MonarchMerchant
