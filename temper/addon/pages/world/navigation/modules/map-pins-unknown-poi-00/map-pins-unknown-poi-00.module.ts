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
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
