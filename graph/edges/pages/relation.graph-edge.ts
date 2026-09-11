import type { GraphEdge } from "akasha/graph/edges/graph-edge.page-type.types.ts"

export const relation = {
  id: "01a04fee-4ee9-7de5-b31d-cfefd76154f2",
  type: "graph-edge",
  slug: "relation",
  definition: "one page naming another through a property",
  index: "index/index-relation",
  attributes: ["graph-attribute/property"],
} as const satisfies GraphEdge
