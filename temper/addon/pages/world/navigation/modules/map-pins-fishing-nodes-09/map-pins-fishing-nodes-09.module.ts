import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes09 = {
  id: "01a06269-2ac6-796a-8e94-eb35322f2467",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-09",
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
