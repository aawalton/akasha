import type { GraphEdge } from "akasha/graph/edge/graph-edge.page-type.types.ts"

export const relation = {
  id: "01a04fee-4ee9-7de5-b31d-cfefd76154f2",
  type: "page-type/graph-edge",
  slug: "relation",
  definition: "one page naming another through a property",
  attributes: ["graph-attribute/property"],
  createdAt: "2026-08-29T23:50:12.969Z",
  updatedAt: "2026-09-15T17:05:04.000Z",
} as const satisfies GraphEdge
