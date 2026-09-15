import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const importers = {
  id: "01a0a5ea-c621-7904-9d7e-afad974adfe7",
  type: "page-type/graph-predicate",
  slug: "importers",
  definition: "every file that reaches a seed file by naming it",
  edges: ["graph-edge/import-edge"],
  direction: "in",
} as const satisfies GraphPredicate
