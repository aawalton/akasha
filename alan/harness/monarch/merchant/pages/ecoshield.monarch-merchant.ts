import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const ecoshield = {
  id: "01a0655b-fcdc-7013-8fef-20ca2f7a4461",
  type: "page-type/monarch-merchant",
  slug: "ecoshield",
  title: "ecoshield",
  merchantPatterns: ["ecoshield"],
} as const satisfies MonarchMerchant
