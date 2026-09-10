import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const cloudflare = {
  id: "01a0655b-fcdc-700d-aa2d-e3be7709b205",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "cloudflare",
  title: "cloudflare",
  merchantPatterns: ["cloudflare"],
} as const satisfies MonarchMerchant
