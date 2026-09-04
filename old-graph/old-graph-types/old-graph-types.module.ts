import type { Module } from "@akasha/code-system/module"

export const oldGraphTypes = {
  id: "01a06950-57ae-7bde-84d5-81804c116b4d",
  pageTypeSlug: "module",
  slug: "old-graph-types",
  definition: "the shapes the old graph's nodes, edges, producers and derivers were written in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape here is a type and this module exports no value.",
    },
  ],
} as const satisfies Module
