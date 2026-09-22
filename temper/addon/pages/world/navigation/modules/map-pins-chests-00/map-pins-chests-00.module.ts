import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests00 = {
  id: "01a06269-2a84-7065-897a-75e89e3eea38",
  type: "page-type/module",
  slug: "map-pins-chests-00",
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
