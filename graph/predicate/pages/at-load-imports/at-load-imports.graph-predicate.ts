import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"

export const atLoadImports = {
  id: "01a0aa71-af84-7559-908f-9451a3f9f1d1",
  type: "page-type/graph-predicate",
  slug: "at-load-imports",
  definition: "every file a seed file reaches as that seed file loads",
  edges: ["graph-edge/import-edge"],
  direction: "out",
  follows: [
    { attribute: "graph-attribute/names", value: "code" },
    { attribute: "graph-attribute/loading", value: "at-load" },
  ],
  createdAt: "2026-09-16T13:39:32.356Z",
  updatedAt: "2026-09-16T13:41:48.000Z",
} as const satisfies GraphPredicate
