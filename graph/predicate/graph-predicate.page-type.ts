import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const graphPredicate = {
  id: "01a0a5ba-8fb1-7bbb-ae4e-1c26277c3a4e",
  type: "page-type",
  slug: "graph-predicate",
  definition: "a rule saying which nodes and edges a closure takes in",
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
