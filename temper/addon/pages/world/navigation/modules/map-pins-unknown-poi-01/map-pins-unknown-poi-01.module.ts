import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsUnknownPoi01 = {
  id: "01a06269-2b04-7c1a-a59d-afc5e0d210ca",
  type: "page-type/module",
  slug: "map-pins-unknown-poi-01",
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
  createdAt: "2026-09-02T13:57:34.596Z",
  updatedAt: "2026-09-22T14:17:51.000Z",
} as const satisfies Module
