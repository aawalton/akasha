import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetrics02 = {
  id: "01a06152-c2cd-7898-8ba5-25ed6cd30252",
  pageTypeSlug: "module",
  slug: "companion-metrics-02",
  definition:
    "the last fifteen companion metric declarations, in the order the metrics table gathers them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric's arithmetic is a tree of nodes rather than a written function.",
    },
    {
      invariantKind: "constraint",
      statement: "A run holds a contiguous stretch of the companion metrics table.",
    },
  ],
} as const satisfies Module
