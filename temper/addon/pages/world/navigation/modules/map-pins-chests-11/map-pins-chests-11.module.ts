import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests11 = {
  id: "01a06269-2a90-7562-ae58-c525d410f942",
  type: "page-type/module",
  slug: "map-pins-chests-11",
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
