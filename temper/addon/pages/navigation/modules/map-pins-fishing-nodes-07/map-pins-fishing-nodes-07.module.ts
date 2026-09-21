import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes07 = {
  id: "01a06269-2ac4-7335-8a50-69623e4bd6f6",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-07",
  definition: "one run of the fishing hole places by zone",
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
