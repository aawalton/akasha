import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const spotify = {
  id: "01a0655b-fcdc-7029-bcca-58cde4310aad",
  pageTypeSlug: "monarch-merchant",
  slug: "spotify",
  title: "spotify",
  merchantPatterns: ["spotify"],
} as const satisfies MonarchMerchant
