import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const amazonStoreCard = {
  id: "01a0655b-fcdc-7003-a69a-34759442dfae",
  pageTypeSlug: "monarch-merchant",
  slug: "amazon-store-card",
  title: "amazon store card",
  merchantPatterns: ["amz_storecrd_pmt"],
} as const satisfies MonarchMerchant
