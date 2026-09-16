import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const children = {
  id: "01a0aac5-3bf5-7c3a-8700-99580db79b6e",
  type: "page-type/graph-predicate",
  slug: "children",
  definition: "every page a seed page names among its parts, however far",
  edges: ["graph-edge/relation"],
  direction: "out",
  follows: [{ attribute: "graph-attribute/property", value: "parts" }],
} as const satisfies GraphPredicate
