import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sampleShape = {
  id: "01a05bc7-9129-7001-9204-f43ce2046c31",
  type: "page-type/module",
  slug: "sample-shape",
  definition: "what a health reading has, and the metrics one can be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric names the unit its readings are counted in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stored reading has the instant the reading arrived on top of the value read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here exists at runtime beyond the two lists of metrics.",
    },
  ],
} as const satisfies Module
