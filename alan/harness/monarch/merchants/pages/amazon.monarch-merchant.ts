import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const amazon = {
  id: "01a0655b-fcdc-7002-bd51-d30a0546daa0",
  type: "monarch-merchant",
  slug: "amazon",
  title: "amazon",
  merchantPatterns: ["amazon"],
} as const satisfies MonarchMerchant
