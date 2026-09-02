import type { Module } from "@akasha/code-system/module"

export const tradingSellHelper = {
  id: "01a06160-2a5d-73e5-9fde-29726e0ec8fb",
  pageTypeSlug: "module",
  slug: "trading-sell-helper",
  definition: "offering a price when a player lists an item for sale",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A suggested price comes from the trade centre where it has one.",
    },
  ],
} as const satisfies Module
