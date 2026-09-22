import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const greatCoursesCollection = {
  id: "01a06574-0291-7004-9508-74c1258e02c0",
  type: "page-type/page-type",
  slug: "great-courses-collection",
  definition: "a shelf holding the whole Great Courses catalogue",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogue's root shelf sits under nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shelf states no length of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day the catalogue was last read is kept on its root shelf alone.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
