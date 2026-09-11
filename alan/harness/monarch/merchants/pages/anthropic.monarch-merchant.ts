import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchants/monarch-merchant.page-type.types.ts"

export const anthropic = {
  id: "01a0655b-fcdc-7004-98db-6c883de19ab8",
  type: "monarch-merchant",
  slug: "anthropic",
  title: "anthropic",
  merchantPatterns: ["anthropic", "claude.ai subscription"],
} as const satisfies MonarchMerchant
