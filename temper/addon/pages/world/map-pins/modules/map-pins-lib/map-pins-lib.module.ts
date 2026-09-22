import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLib = {
  id: "01a06062-57e0-7fda-88f1-71a061e4e2a1",
  type: "page-type/module",
  slug: "map-pins-lib",
  definition: "the object every feature putting a pin on the world map calls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A map change re-reads every filter's saved state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map change to the global filter group leaves the filters alone.",
    },
  ],
} as const satisfies Module
