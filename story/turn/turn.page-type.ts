import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const turn = {
  id: "01a0c9fc-87b4-75fb-b8af-e42e6f1986d0",
  type: "page-type/page-type",
  slug: "turn",
  definition: "one exchange of a story being made",
  pluralSlug: "turns",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["relation-property/turn-story"],
  properties: [
    { pageProperty: "relation-property/turn-story", required: true, many: false },
    { pageProperty: "number-property/turn-number", required: true, many: false },
    { pageProperty: "file-property/prose", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
