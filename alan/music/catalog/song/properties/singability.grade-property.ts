import type { GradeProperty } from "akasha/page/grade-property/grade-property.page-type.types.ts"

export const singability = {
  id: "01a06243-144b-700b-83e8-f1b91786511f",
  type: "page-type/grade-property",
  slug: "singability",
  propertySlug: "singability",
  definition: "how well Alan can sing a song",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A singability is graded on the ladder every grade is graded on.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:37:16.400Z",
} as const satisfies GradeProperty
