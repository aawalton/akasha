import type { GraphEdge } from "akasha/graph/edge/graph-edge.page-type.types.ts"

export const importEdge = {
  id: "01a04fee-4ee8-7dcc-a40d-9b30bb6d6d74",
  type: "page-type/graph-edge",
  slug: "import-edge",
  definition: "a file naming another in its own body",
  attributes: ["graph-attribute/known", "graph-attribute/names", "graph-attribute/loading"],
  createdAt: "2026-08-29T23:50:12.968Z",
  updatedAt: "2026-09-22T10:11:09.000Z",
} as const satisfies GraphEdge
