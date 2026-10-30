import type { GradeProperty } from "akasha/page/grade-property/grade-property.page-type.types.ts"

export const grade = {
  id: "01a0655b-4a9b-7003-a822-f4a3ceda67b2",
  type: "page-type/grade-property",
  slug: "grade",
  propertySlug: "grade",
  definition: "Alan's mark for how good a thing is",
  spellings: [{ partOfSpeech: "part-of-speech/past-participle", spelling: "graded" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page may state a grade.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:41:16.827Z",
  updatedAt: "2026-10-30T17:20:35.436Z",
} as const satisfies GradeProperty
