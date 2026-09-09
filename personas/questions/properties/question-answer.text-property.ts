import type { TextProperty } from "@akasha/pages/text-property"

export type QuestionAnswer = string

export const questionAnswer = {
  id: "01a06823-89b2-7006-b80a-c59c41029c23",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "question-answer",
  propertySlug: "answer",
  definition: "what closed a question: Alan's answer, or the note saying why it was let go",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer is Alan's words rather than a pointer into the answers offered.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that repeats an offered answer word for word is still written out.",
    },
    {
      invariantKind: "departure",
      statement: "A question closed with nothing said has no answer.",
    },
  ],
} as const satisfies TextProperty
