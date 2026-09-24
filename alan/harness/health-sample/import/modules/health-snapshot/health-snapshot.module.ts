import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthSnapshot = {
  id: "01a05c14-b11a-7001-878a-9f73d85a1b3a",
  type: "page-type/module",
  slug: "health-snapshot",
  definition: "a summary of what an export has, and how that summary reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric with no record is summarised as absent rather than as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric counted over a day is totalled by day before the metric is summarised.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A snapshot writes nothing to the store.",
    },
  ],
} as const satisfies Module
