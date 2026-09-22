import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes00 = {
  id: "01a06269-2abc-775d-bc03-e3e85e36eaeb",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-00",
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
