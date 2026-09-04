import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const walmart = {
  id: "01a0655b-fcdc-7031-8b1e-fd182883ca8c",
  pageTypeSlug: "monarch-merchant",
  slug: "walmart",
  title: "walmart",
  merchantPatterns: ["walmart"],
} as const satisfies MonarchMerchant
