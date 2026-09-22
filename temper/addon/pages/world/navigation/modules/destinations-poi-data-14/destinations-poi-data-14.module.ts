import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData14 = {
  id: "01a06269-29d1-727b-a2b4-6b11a1c50ccb",
  type: "page-type/module",
  slug: "destinations-poi-data-14",
  definition: "one run of the keeps, the points of interest by zone and the dungeon item sets",
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
