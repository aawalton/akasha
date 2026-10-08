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
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.585Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
