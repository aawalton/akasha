import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests25 = {
  id: "01a06269-2a9f-76b0-998c-beda8db311fd",
  type: "page-type/module",
  slug: "map-pins-chests-25",
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
