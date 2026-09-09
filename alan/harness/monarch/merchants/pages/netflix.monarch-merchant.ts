import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const netflix = {
  id: "01a0655b-fcdc-7021-960b-b4cd683f9daf",
  pageTypeSlug: "monarch-merchant",
  slug: "netflix",
  title: "netflix",
  merchantPatterns: ["netflix"],
} as const satisfies MonarchMerchant
