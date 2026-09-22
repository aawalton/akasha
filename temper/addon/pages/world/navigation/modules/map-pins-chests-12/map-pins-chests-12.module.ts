import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests12 = {
  id: "01a06269-2a91-7675-90ca-5e33880733a8",
  type: "page-type/module",
  slug: "map-pins-chests-12",
  definition: "a set of the treasure chest places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
