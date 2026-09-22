import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests27 = {
  id: "01a06269-2aa1-770a-9399-f219a465ec7b",
  type: "page-type/module",
  slug: "map-pins-chests-27",
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
