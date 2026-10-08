import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData14 = {
  id: "01a06269-29d1-727b-a2b4-6b11a1c50ccb",
  type: "page-type/module",
  slug: "destinations-poi-data-14",
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
  createdAt: "2026-09-02T13:57:34.289Z",
  updatedAt: "2026-09-22T14:20:22.000Z",
} as const satisfies Module
