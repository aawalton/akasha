import type { GradeProperty } from "akasha/page/grade-property/grade-property.page-type.types.ts"

export const singability = {
  id: "01a06243-144b-700b-83e8-f1b91786511f",
  type: "page-type/grade-property",
  slug: "singability",
  propertySlug: "singability",
  definition: "Alan's grade for how well a song sits in his own voice",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A singability is graded on the ladder every grade is graded on.",
    },
  ],
  types: "ts",
} as const satisfies GradeProperty
