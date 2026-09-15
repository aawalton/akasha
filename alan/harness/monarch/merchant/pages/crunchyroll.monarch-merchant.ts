import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const crunchyroll = {
  id: "01a0655b-fcdc-7010-a956-21ef0d4b3029",
  type: "page-type/monarch-merchant",
  slug: "crunchyroll",
  title: "crunchyroll",
  merchantPatterns: ["crunchyroll"],
} as const satisfies MonarchMerchant
