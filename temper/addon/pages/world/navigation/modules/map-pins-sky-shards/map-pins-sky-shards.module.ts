import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsSkyShards = {
  id: "01a06269-2af9-7142-81f1-8d855a272c28",
  type: "page-type/module",
  slug: "map-pins-sky-shards",
  definition: "the skyshard places by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
