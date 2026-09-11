import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const selecthealth = {
  id: "01a0655b-fcdc-7028-a071-c8cffc665ce0",
  type: "monarch-merchant",
  slug: "selecthealth",
  title: "selecthealth",
  merchantPatterns: ["select health"],
} as const satisfies MonarchMerchant
