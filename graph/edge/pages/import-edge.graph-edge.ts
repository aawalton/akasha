import type { GraphEdge } from "akasha/graph/edge/graph-edge.page-type.types.ts"

export const importEdge = {
  id: "01a04fee-4ee8-7dcc-a40d-9b30bb6d6d74",
  type: "page-type/graph-edge",
  slug: "import-edge",
  definition: "one file naming another in its own body",
  attributes: ["graph-attribute/known", "graph-attribute/names", "graph-attribute/loading"],
} as const satisfies GraphEdge
