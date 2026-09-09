import type { InstantProperty } from "@akasha/pages/instant-property"

export type QuestionClosedAt = string

export const questionClosedAt = {
  id: "01a06823-89b2-7007-9970-d5a9da370fe4",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "question-closed-at",
  propertySlug: "closed-at",
  definition: "when a question stopped waiting on Alan",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This instant is when the question closed.",
    },
    {
      invariantKind: "departure",
      statement: "A closed question with no such instant closed at an hour nobody wrote down.",
    },
  ],
} as const satisfies InstantProperty
