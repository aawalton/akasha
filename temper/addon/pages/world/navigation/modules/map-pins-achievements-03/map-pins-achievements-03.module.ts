import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsAchievements03 = {
  id: "01a06269-2a41-7c4a-b999-5080597bc1ce",
  type: "page-type/module",
  slug: "map-pins-achievements-03",
  definition: "a set of the achievement pin places by zone",
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
