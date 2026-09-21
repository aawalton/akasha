import type { GradeProperty } from "akasha/page/grade-property/grade-property.page-type.types.ts"

export const grade = {
  id: "01a0655b-4a9b-7003-a822-f4a3ceda67b2",
  type: "page-type/grade-property",
  slug: "grade",
  propertySlug: "grade",
  definition: "Alan's mark for how good a thing is",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page may state a grade.",
    },
  ],
  types: "ts",
} as const satisfies GradeProperty
