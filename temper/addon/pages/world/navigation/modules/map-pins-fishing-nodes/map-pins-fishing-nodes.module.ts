import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingNodes = {
  id: "01a06269-2ac7-7e1f-90ef-270e13117f89",
  type: "page-type/module",
  slug: "map-pins-fishing-nodes",
  definition: "the fishing hole places by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
} as const satisfies Module
