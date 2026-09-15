import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const citi = {
  id: "01a0655b-fcdc-700c-9294-7c93898536be",
  type: "page-type/monarch-merchant",
  slug: "citi",
  title: "citi",
  merchantPatterns: ["citibank online"],
} as const satisfies MonarchMerchant
