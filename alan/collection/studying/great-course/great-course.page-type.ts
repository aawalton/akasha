import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const greatCourse = {
  id: "01a06574-0291-7002-a1fa-cbd1f9cc0fb4",
  type: "page-type/page-type",
  slug: "great-course",
  definition: "a course teaching Alan",
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
  createdAt: "2026-09-03T04:08:16.785Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies PageType
