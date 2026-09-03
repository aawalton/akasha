import type { Module } from "@akasha/code-system/module"

export const triageFanoutMarkers = {
  id: "01a06885-0bab-7002-a52e-639e797393eb",
  pageTypeSlug: "module",
  slug: "triage-fanout-markers",
  definition: "the shapes a consolidated fan-out log's own lines are recognised by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A line is recognised by the shape the runner printed it in, never by where it fell in the log.",
    },
    {
      invariantKind: "departure",
      statement: "A colour escape is taken off a line before the line is matched.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads a log; these are the shapes alone, so one reader states them once.",
    },
  ],
} as const satisfies Module
