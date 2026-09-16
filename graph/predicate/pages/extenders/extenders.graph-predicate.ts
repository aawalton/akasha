import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const extenders = {
  id: "01a0aae8-b637-7436-9196-a38e65a80b93",
  type: "page-type/graph-predicate",
  slug: "extenders",
  definition: "every page type extending a seed page type, however far",
  edges: ["graph-edge/relation"],
  direction: "in",
  follows: [{ attribute: "graph-attribute/property", value: "extends-type" }],
} as const satisfies GraphPredicate
