import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const chase = {
  id: "01a0655b-fcdc-700a-ba78-d79d1e256030",
  type: "page-type/monarch-merchant",
  slug: "chase",
  title: "chase",
  merchantPatterns: ["chase credit crd"],
} as const satisfies MonarchMerchant
