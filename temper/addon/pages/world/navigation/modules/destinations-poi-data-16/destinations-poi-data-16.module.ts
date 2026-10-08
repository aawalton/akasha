import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData16 = {
  id: "01a06269-29d3-717f-9271-9fe5e798799e",
  type: "page-type/module",
  slug: "destinations-poi-data-16",
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
  createdAt: "2026-09-02T13:57:34.291Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
