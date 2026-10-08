import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const amazonStoreCard = {
  id: "01a0655b-fcdc-7003-a69a-34759442dfae",
  type: "page-type/monarch-merchant",
  slug: "amazon-store-card",
  title: "amazon store card",
  merchantPatterns: ["amz_storecrd_pmt"],
  createdAt: "2026-09-03T03:42:02.460Z",
  updatedAt: "2026-09-15T17:33:40.000Z",
} as const satisfies MonarchMerchant
