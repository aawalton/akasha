import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes04 = {
  id: "01a06269-2ac1-77ce-8c18-dfebbb3338e3",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-04",
  definition: "a set of the fishing hole places by zone",
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
} as const satisfies Module
