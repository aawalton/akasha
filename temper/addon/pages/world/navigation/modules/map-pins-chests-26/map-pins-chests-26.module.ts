import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests26 = {
  id: "01a06269-2aa0-786f-9496-98e68dda8c08",
  type: "page-type/module",
  slug: "map-pins-chests-26",
  definition: "a set of the treasure chest places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
