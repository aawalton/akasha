import type { TextProperty } from "@akasha/pages-system/text-property"

export type QuestionAskedIn = string

export const questionAskedIn = {
  id: "01a06823-89b2-7003-9361-9f665902bad0",
  pageTypeSlug: "text-property",
  slug: "question-asked-in",
  propertySlug: "asked-in",
  definition: "the stretch of work a question came out of, named by its id",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Questions sharing this id came out of one stretch of work.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to the stretch of work a question came out of.",
    },
  ],
} as const satisfies TextProperty
