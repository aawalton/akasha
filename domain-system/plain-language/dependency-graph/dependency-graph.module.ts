import type { Module } from "@akasha/code-system/module"

export const dependencyGraph = {
  id: "01a06cd8-d030-7f85-92a3-d5c7d03b4e55",
  pageTypeSlug: "module",
  slug: "dependency-graph",
  definition: "the tree a sentence's words make",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is numbered by its place in its sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A head of zero names the root.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence carries one root.",
    },
    {
      invariantKind: "departure",
      statement: "An offset is an index into the whole document rather than into one sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A relation is matched by its own name or by the name before its colon.",
    },
    {
      invariantKind: "departure",
      statement: "A tie between two heads is broken toward the lower token.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle is broken by the swap that costs the least score.",
    },
  ],
} as const satisfies Module
