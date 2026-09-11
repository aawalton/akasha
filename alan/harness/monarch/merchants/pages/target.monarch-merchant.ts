import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const target = {
  id: "01a0655b-fcdc-702c-9032-15f5a8a925d3",
  type: "monarch-merchant",
  slug: "target",
  title: "target",
  merchantPatterns: ["target"],
} as const satisfies MonarchMerchant
