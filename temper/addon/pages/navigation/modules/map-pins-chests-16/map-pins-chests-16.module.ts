import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests16 = {
  id: "01a06269-2a95-7276-b1be-dacc5424a7db",
  type: "page-type/module",
  slug: "map-pins-chests-16",
  definition: "one run of the treasure chest places by zone",
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
