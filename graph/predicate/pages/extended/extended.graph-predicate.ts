import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const extended = {
  id: "01a0aada-f708-72a5-946c-a4e7144b4bac",
  type: "page-type/graph-predicate",
  slug: "extended",
  definition: "every page type a seed page type extends, however far",
  edges: ["graph-edge/relation"],
  direction: "out",
  follows: [{ attribute: "graph-attribute/property", value: "extends-type" }],
} as const satisfies GraphPredicate
