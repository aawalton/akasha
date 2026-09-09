import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const cashPlusSweep = {
  id: "01a0655b-fcdc-7009-8b3a-efe8f4a6c913",
  pageTypeSlug: "monarch-merchant",
  slug: "cash-plus-sweep",
  title: "cash plus sweep",
  merchantPatterns: ["sweep", "transfer incoming", "transfer outgoing"],
} as const satisfies MonarchMerchant
