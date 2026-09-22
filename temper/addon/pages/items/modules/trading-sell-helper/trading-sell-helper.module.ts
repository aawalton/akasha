import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSellHelper = {
  id: "01a06160-2a5d-73e5-9fde-29726e0ec8fb",
  type: "page-type/module",
  slug: "trading-sell-helper",
  definition: "offering a price when a player lists an item for sale",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A suggested price comes from the trade centre where that trade centre has a price.",
    },
  ],
} as const satisfies Module
