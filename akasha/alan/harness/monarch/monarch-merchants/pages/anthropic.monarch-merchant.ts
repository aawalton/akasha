import type { MonarchMerchant } from "../monarch-merchant.page-type.ts"

export const anthropic = {
  id: "01a0655b-fcdc-7004-98db-6c883de19ab8",
  pageTypeSlug: "monarch-merchant",
  slug: "anthropic",
  title: "anthropic",
  merchantPatterns: ["anthropic", "claude.ai subscription"],
} as const satisfies MonarchMerchant
