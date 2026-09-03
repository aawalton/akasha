import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const momSFixedExpenses = {
  id: "01a0655b-fcdc-7020-aca7-2959e69f11ab",
  pageTypeSlug: "monarch-merchant",
  slug: "mom-s-fixed-expenses",
  title: "mom's fixed expenses",
  merchantPatterns: ["fixed expenses"],
} as const satisfies MonarchMerchant
