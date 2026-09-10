import type { MonarchMerchant } from "../monarch-merchant.page-type.types.ts"

export const crunchyroll = {
  id: "01a0655b-fcdc-7010-a956-21ef0d4b3029",
  pageTypeSlug: "monarch-merchant",
  type: "monarch-merchant",
  slug: "crunchyroll",
  title: "crunchyroll",
  merchantPatterns: ["crunchyroll"],
} as const satisfies MonarchMerchant
