import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests17 = {
  id: "01a06269-2a96-77e2-900a-de7e5fbbd003",
  type: "page-type/module",
  slug: "map-pins-chests-17",
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
