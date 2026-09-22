import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests06 = {
  id: "01a06269-2a8b-77bc-ab48-643d0d9f1b60",
  type: "page-type/module",
  slug: "map-pins-chests-06",
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
