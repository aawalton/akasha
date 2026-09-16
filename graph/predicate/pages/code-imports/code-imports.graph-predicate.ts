import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const codeImports = {
  id: "01a0aa63-535d-77bf-a4b9-cd39a401f4e7",
  type: "page-type/graph-predicate",
  slug: "code-imports",
  definition: "every file a seed file reaches by loading it",
  edges: ["graph-edge/import-edge"],
  direction: "out",
  follows: [{ attribute: "graph-attribute/names", value: "code" }],
} as const satisfies GraphPredicate
