import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const netflix = {
  id: "01a0655b-fcdc-7021-960b-b4cd683f9daf",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "netflix",
  title: "netflix",
  merchantPatterns: ["netflix"],
} as const satisfies MonarchMerchant
