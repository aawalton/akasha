import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const amazon = {
  id: "01a0655b-fcdc-7002-bd51-d30a0546daa0",
  pageTypeSlug: "monarch-merchant",
  slug: "amazon",
  title: "amazon",
  merchantPatterns: ["amazon"],
} as const satisfies MonarchMerchant
