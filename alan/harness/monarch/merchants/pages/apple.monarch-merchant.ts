import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const apple = {
  id: "01a0655b-fcdc-7005-b13d-903ba77e3d70",
  pageTypeSlug: "monarch-merchant",
  slug: "apple",
  title: "apple",
  merchantPatterns: ["apple.com/bill"],
} as const satisfies MonarchMerchant
