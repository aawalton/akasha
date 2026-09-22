import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsSkyShards01 = {
  id: "01a06269-2af6-70ba-8a25-2a4d3fd2963b",
  type: "page-type/module",
  slug: "map-pins-sky-shards-01",
  definition: "a run of the skyshard places by zone",
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
