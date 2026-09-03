import type { Module } from "@akasha/code-system/module"

export const oldGraphAsking = {
  id: "01a06950-57ae-734d-8521-ff21816989c6",
  pageTypeSlug: "module",
  slug: "old-graph-asking",
  definition: "where the old graph was asked, and what shape an answer came back in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer carries either what was asked for or why the answer did not come.",
    },
    {
      invariantKind: "departure",
      statement: "Every question put to the old graph throws.",
    },
  ],
} as const satisfies Module
