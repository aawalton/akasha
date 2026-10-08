import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsUnknownPoi00 = {
  id: "01a06269-2b03-7dfe-86d3-899061ceb2a7",
  type: "page-type/module",
  slug: "map-pins-unknown-poi-00",
  definition: "a set of the points of interest by zone the map can show as unknown",
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
  createdAt: "2026-09-02T13:57:34.595Z",
  updatedAt: "2026-09-22T14:18:53.000Z",
} as const satisfies Module
