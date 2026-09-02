import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetrics00 = {
  id: "01a06152-c2cc-7096-9f13-4d234f988bec",
  pageTypeSlug: "module",
  slug: "companion-metrics-00",
  definition:
    "the first fifteen companion metric declarations, in the order the metrics table gathers them",
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
