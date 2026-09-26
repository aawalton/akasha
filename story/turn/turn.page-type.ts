import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const turn = {
  id: "01a0c9fc-87b4-75fb-b8af-e42e6f1986d0",
  type: "page-type/page-type",
  slug: "turn",
  definition: "one exchange of a story being made",
  pluralSlug: "turns",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [
    {
      pageProperty: "multi-relation-property/part-of-collections",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/position", required: true, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is part of the story the turn was made in, as a collection is part of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's position is which turn of its story the turn is.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
