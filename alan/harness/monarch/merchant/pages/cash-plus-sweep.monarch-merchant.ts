import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const cashPlusSweep = {
  id: "01a0655b-fcdc-7009-8b3a-efe8f4a6c913",
  type: "page-type/monarch-merchant",
  slug: "cash-plus-sweep",
  title: "cash plus sweep",
  merchantPatterns: ["sweep", "transfer incoming", "transfer outgoing"],
  createdAt: "2026-09-03T03:42:02.460Z",
  updatedAt: "2026-09-15T17:33:40.000Z",
} as const satisfies MonarchMerchant
