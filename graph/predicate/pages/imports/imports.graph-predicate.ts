import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const imports = {
  id: "01a0a5ea-a68e-7327-abc8-739b3ff5cb50",
  type: "page-type/graph-predicate",
  slug: "imports",
  definition: "every file a seed file reaches by naming it",
  edges: ["graph-edge/import-edge"],
  direction: "out",
  createdAt: "2026-09-15T16:33:33.838Z",
  updatedAt: "2026-09-15T21:46:34.000Z",
} as const satisfies GraphPredicate
