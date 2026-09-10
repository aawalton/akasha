import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const disneyPlus = {
  id: "01a0655b-fcdc-7012-806d-1cafeb8affc4",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "disney-plus",
  title: "disney plus",
  merchantPatterns: ["disneyplus", "disney plus"],
} as const satisfies MonarchMerchant
