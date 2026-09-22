import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests21 = {
  id: "01a06269-2a9b-79f8-8d2f-0ba62989ea61",
  type: "page-type/module",
  slug: "map-pins-chests-21",
  definition: "a run of the treasure chest places by zone",
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
