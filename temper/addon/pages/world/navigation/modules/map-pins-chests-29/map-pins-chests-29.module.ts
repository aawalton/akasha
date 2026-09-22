import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests29 = {
  id: "01a06269-2aa4-79a7-86e2-9c757c441371",
  type: "page-type/module",
  slug: "map-pins-chests-29",
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
