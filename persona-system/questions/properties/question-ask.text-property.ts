import type { TextProperty } from "@akasha/pages-system/text-property"

export type QuestionAsk = string

export const questionAsk = {
  id: "01a06823-89b2-7001-97b7-83b51df01faf",
  pageTypeSlug: "text-property",
  slug: "question-ask",
  propertySlug: "ask",
  definition: "the question as it was put to Alan",
  max: 4000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ask is the whole question rather than a title standing for one.",
    },
    {
      invariantKind: "departure",
      statement: "An ask carries what Alan needs to answer without opening anything else.",
    },
  ],
} as const satisfies TextProperty
