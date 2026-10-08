import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const disneyPlus = {
  id: "01a0655b-fcdc-7012-806d-1cafeb8affc4",
  type: "page-type/monarch-merchant",
  slug: "disney-plus",
  title: "disney plus",
  merchantPatterns: ["disneyplus", "disney plus"],
  createdAt: "2026-09-03T03:42:02.460Z",
  updatedAt: "2026-09-15T17:33:40.000Z",
} as const satisfies MonarchMerchant
