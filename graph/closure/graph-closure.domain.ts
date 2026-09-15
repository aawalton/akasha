import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const graphClosure = {
  id: "01a0a5ba-a6eb-7d1c-a9f8-42124501e4d5",
  type: "domain",
  slug: "graph-closure",
  definition: "the nodes and edges one predicate takes in from its seeds",
  parts: ["performance/answer-cost"],
} as const satisfies Domain
