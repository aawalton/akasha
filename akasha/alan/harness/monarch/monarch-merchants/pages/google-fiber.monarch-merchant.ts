import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const googleFiber = {
  id: "01a0655b-fcdc-7017-9032-d59e8a80dd92",
  pageTypeSlug: "monarch-merchant",
  slug: "google-fiber",
  title: "google fiber",
  merchantPatterns: ["gfiber", "google *fiber"],
} as const satisfies MonarchMerchant
