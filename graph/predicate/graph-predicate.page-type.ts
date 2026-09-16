import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const graphPredicate = {
  id: "01a0a5ba-8fb1-7bbb-ae4e-1c26277c3a4e",
  type: "page-type/page-type",
  slug: "graph-predicate",
  definition: "a rule saying which nodes and edges a closure takes in",
  extends: ["page-type/domain"],
  parts: [
    "graph-predicate/at-load-imports",
    "graph-predicate/children",
    "graph-predicate/code-imports",
    "graph-predicate/extended",
    "graph-predicate/extenders",
    "graph-predicate/importers",
    "graph-predicate/imports",
    "graph-predicate/parents",
    "module/graph-predicate-closure",
    "record-property/follows",
    "relation-property/edges",
    "relation-property/followed-attribute",
    "text-property/attribute-value",
    "text-property/direction",
  ],
  properties: [
    { pageProperty: "relation-property/edges", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/direction", required: true, many: false },
    { pageProperty: "record-property/follows", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A predicate names the edge kinds a closure follows and the way each is followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which nodes a closure takes in is handed to the ask rather than named here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
