import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData04 = {
  id: "01a06269-29c6-7fdf-95cc-59e219aec802",
  type: "page-type/module",
  slug: "destinations-poi-data-04",
  definition: "a set of the keeps, the points of interest by zone and the dungeon item sets",
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
  createdAt: "2026-09-02T13:57:34.278Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
