import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const graphAttribute = {
  id: "01a04fe8-cec0-78cc-85d5-3ca1e47761ce",
  type: "page-type/page-type",
  slug: "graph-attribute",
  definition: "a fact carried on an edge",
  parts: [
    "graph-attribute/known",
    "graph-attribute/loading",
    "graph-attribute/names",
    "graph-attribute/property",
  ],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
