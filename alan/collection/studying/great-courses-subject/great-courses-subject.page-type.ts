import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const greatCoursesSubject = {
  id: "01a06574-0291-7003-8e30-de8222ab3a07",
  type: "page-type/page-type",
  slug: "great-courses-subject",
  definition: "a collection of the courses that teach a kind of knowledge",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject has only courses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject states no length of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every subject sits under the shelf the subjects are sorted on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:08:16.785Z",
  updatedAt: "2026-10-30T15:12:55.655Z",
} as const satisfies PageType
