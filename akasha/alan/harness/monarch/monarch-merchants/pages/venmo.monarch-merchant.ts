import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const venmo = {
  id: "01a0655b-fcdc-7030-98f5-ce9756495e03",
  pageTypeSlug: "monarch-merchant",
  slug: "venmo",
  title: "venmo",
  merchantPatterns: ["venmo"],
} as const satisfies MonarchMerchant
