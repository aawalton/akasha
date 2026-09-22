import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes02 = {
  id: "01a06269-2abf-7c49-b1af-874a60d281c4",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-02",
  definition: "a set of the fishing hole places by zone",
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
