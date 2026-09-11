import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const googleFiber = {
  id: "01a0655b-fcdc-7017-9032-d59e8a80dd92",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "google-fiber",
  title: "google fiber",
  merchantPatterns: ["gfiber", "google *fiber"],
} as const satisfies MonarchMerchant
