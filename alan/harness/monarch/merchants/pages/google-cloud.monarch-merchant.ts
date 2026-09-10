import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const googleCloud = {
  id: "01a0655b-fcdc-7016-9375-d1613b7efa75",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "google-cloud",
  title: "google cloud",
  merchantPatterns: ["google cloud", "google *cloud"],
} as const satisfies MonarchMerchant
