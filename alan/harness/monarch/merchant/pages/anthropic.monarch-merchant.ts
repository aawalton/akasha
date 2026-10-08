import type { MonarchMerchant } from "akasha/alan/harness/monarch/merchant/monarch-merchant.page-type.types.ts"

export const anthropic = {
  id: "01a0655b-fcdc-7004-98db-6c883de19ab8",
  type: "page-type/monarch-merchant",
  slug: "anthropic",
  title: "anthropic",
  merchantPatterns: ["anthropic", "claude.ai subscription"],
  createdAt: "2026-09-03T03:42:02.460Z",
  updatedAt: "2026-09-15T17:33:40.000Z",
} as const satisfies MonarchMerchant
