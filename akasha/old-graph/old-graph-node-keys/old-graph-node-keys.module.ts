import type { Module } from "@akasha/code-system/module"

export const oldGraphNodeKeys = {
  id: "01a06950-57ae-73c0-8b94-25af1c4d53e7",
  pageTypeSlug: "module",
  slug: "old-graph-node-keys",
  definition: "how a node's key and a node type's prefix are spelled",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key naming no repo is spelled without a repo.",
    },
    {
      invariantKind: "departure",
      statement: "A node id names the code repo always.",
    },
    {
      invariantKind: "departure",
      statement: "The code repo's name is written out rather than reached for across a cycle.",
    },
  ],
} as const satisfies Module
