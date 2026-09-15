import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const graphEdge = {
  id: "01a04fe8-cebd-71d5-a040-d50b202e6eb1",
  type: "page-type",
  slug: "graph-edge",
  definition: "a way one thing reaches another",
  parts: [
    "graph-edge/import-edge",
    "graph-edge/relation",
    "relation-property/attributes",
    "relation-property/index",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "relation-property/index", required: false, many: false },
    {
      pageProperty: "relation-property/attributes",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An edge kind names the index that answers the edge kind or the graph derives the edge kind here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge kind may name an index and be derived here as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge kind named by an index and derived here says which way each edge came.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge kind names the attributes that edge kind has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute names no edge.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
