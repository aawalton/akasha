import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryVenueTitles = {
  id: "01a0e0d4-8faf-700c-aa29-74433f2c6c31",
  type: "page-type/module",
  slug: "inventory-venue-titles",
  definition: "what the addon calls each venue a plan sends a player to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The titles are written from the venue pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A venue no page titles is named by its key.",
    },
  ],
} as const satisfies Module
