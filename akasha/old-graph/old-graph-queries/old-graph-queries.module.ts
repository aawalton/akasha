import type { Module } from "@akasha/code-system/module"

export const oldGraphQueries = {
  id: "01a06950-57ae-7946-9f68-a1bd738e348f",
  pageTypeSlug: "module",
  slug: "old-graph-queries",
  definition: "what a set of seeds reached, and which paths that closure covered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A membership covering everything is a value rather than a call.",
    },
    {
      invariantKind: "departure",
      statement: "Every remaining question about a closure throws.",
    },
  ],
} as const satisfies Module
