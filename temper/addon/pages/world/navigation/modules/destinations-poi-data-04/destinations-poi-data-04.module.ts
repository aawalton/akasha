import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData04 = {
  id: "01a06269-29c6-7fdf-95cc-59e219aec802",
  type: "page-type/module",
  slug: "destinations-poi-data-04",
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
