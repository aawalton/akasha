import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData05 = {
  id: "01a06269-29c7-7f35-9fc0-cd73fbd09a77",
  type: "page-type/module",
  slug: "destinations-poi-data-05",
  definition: "a run of the keeps, the points of interest by zone and the dungeon item sets",
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
