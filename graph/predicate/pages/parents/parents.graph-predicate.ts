import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const parents = {
  id: "01a0aa8f-1abb-7b9a-90e5-287b3639c797",
  type: "page-type/graph-predicate",
  slug: "parents",
  definition: "every page naming a seed page among its parts, however far",
  edges: ["graph-edge/relation"],
  direction: "in",
  follows: [{ attribute: "graph-attribute/property", value: "parts" }],
} as const satisfies GraphPredicate
