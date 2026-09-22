import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsUnknownPoi = {
  id: "01a06269-2b0b-7446-a5b0-f81ca022e64d",
  type: "page-type/module",
  slug: "map-pins-unknown-poi",
  definition: "the points of interest by zone the map can show as unknown, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
