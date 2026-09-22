import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const greatCourse = {
  id: "01a06574-0291-7002-a1fa-cbd1f9cc0fb4",
  type: "page-type/page-type",
  slug: "great-course",
  definition: "a course Alan is taught by",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course states the minutes the course runs to and the minutes Alan has watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course names every shelf the course sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course Alan has not graded states no rank.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
