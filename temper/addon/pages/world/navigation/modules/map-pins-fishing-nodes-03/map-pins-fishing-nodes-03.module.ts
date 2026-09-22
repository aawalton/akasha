import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes03 = {
  id: "01a06269-2ac0-7c7c-b44e-e9061125729d",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes-03",
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
