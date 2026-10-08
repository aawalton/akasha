import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData10 = {
  id: "01a06269-29cd-762f-a97a-18de36c7f376",
  type: "page-type/module",
  slug: "destinations-poi-data-10",
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
  createdAt: "2026-09-02T13:57:34.285Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
