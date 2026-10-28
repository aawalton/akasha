import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryStockSale = {
  id: "01a18469-01f5-7546-b5c4-81808622d942",
  type: "page-type/module",
  slug: "inventory-stock-sale",
  definition: "the stocked backpack slots a merchant takes where a stock chain ends in selling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stock whose chain ends in a `vendor` leg sells at a merchant what is left over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What is left over is past the holder's own stock, the capped tiers' room and the hand-off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bank's holding and the other characters' are read from the last capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capped tier other than the bank is taken to have its whole count still free.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncapped tier above the `vendor` leg takes everything, so nothing sells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The smallest stacks sell first, and a stack sold in part keeps its stock.",
    },
  ],
  createdAt: "2026-10-28T21:27:16.724Z",
  updatedAt: "2026-10-28T21:27:16.724Z",
} as const satisfies Module
