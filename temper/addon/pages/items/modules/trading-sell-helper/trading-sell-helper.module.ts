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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The price each, the total, the listing fee and the profit are stat rows on one panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window first opens under the cross-character inventory, clear of the game's own windows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It is placed once, so a player who moves it keeps it where they put it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item a posting flow sets pending opens no price window.",
    },
  ],
} as const satisfies Module
