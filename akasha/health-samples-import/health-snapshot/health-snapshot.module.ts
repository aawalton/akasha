import type { Module } from "../../code-system/modules/module.page-type.ts"

export const healthSnapshot = {
  id: "01a05c14-b11a-7001-878a-9f73d85a1b3a",
  pageTypeSlug: "module",
  slug: "health-snapshot",
  definition: "a summary of what an export holds, and how that summary reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric with no record is summarised as absent rather than as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A metric counted over a day is totalled by day before the metric is summarised.",
    },
    {
      invariantKind: "absence",
      statement: "A snapshot writes nothing to the store.",
    },
  ],
} as const satisfies Module
