import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const collectionType = {
  id: "01a0680f-6f00-7001-b374-6d2a9f5c6102",
  type: "page-type/page-type",
  slug: "collection-type",
  definition: "a kind of thing collected, and the unit of one of that kind",
  extends: ["page-type/page"],
  parts: ["select-property/collection-type-status"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/collection-unit", required: true, many: false },
    { pageProperty: "select-property/collection-type-status", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection takes its unit from its kind unless the collection states its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection's `type` names the kind.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
