import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsAchievements02 = {
  id: "01a06269-2a40-7f6a-bf64-5c964f6706e3",
  type: "page-type/module",
  slug: "map-pins-achievements-02",
  definition: "a run of the achievement pin places by zone",
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
