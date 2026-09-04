import type { Module } from "@akasha/code-system/module"

export const graphClosure = {
  id: "01a06949-b281-77a7-a26f-52612d6b3af0",
  pageTypeSlug: "module",
  slug: "graph-closure",
  definition: "everything reachable from some starting points by following successors",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The starting points are part of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A point already seen is not visited again.",
    },
    {
      invariantKind: "departure",
      statement: "Successors are asked for once per point.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle among the successors ends rather than repeating forever.",
    },
    {
      invariantKind: "departure",
      statement: "Points come back in the order they were first seen.",
    },
  ],
} as const satisfies Module
