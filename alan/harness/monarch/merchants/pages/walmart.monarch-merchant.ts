import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const walmart = {
  id: "01a0655b-fcdc-7031-8b1e-fd182883ca8c",
  type: "monarch-merchant",
  slug: "walmart",
  title: "walmart",
  merchantPatterns: ["walmart"],
} as const satisfies MonarchMerchant
