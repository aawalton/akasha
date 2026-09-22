import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsSkyShards00 = {
  id: "01a06269-2af5-70e7-82e3-26daaa80a68d",
  type: "page-type/module",
  slug: "map-pins-sky-shards-00",
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
