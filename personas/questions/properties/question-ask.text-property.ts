import type { TextProperty } from "@akasha/pages/text-property"

export type QuestionAsk = string

export const questionAsk = {
  id: "01a06823-89b2-7001-97b7-83b51df01faf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "question-ask",
  propertySlug: "ask",
  definition: "the question as it was put to Alan",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ask is the whole question rather than a title representing that question.",
    },
    {
      invariantKind: "departure",
      statement: "An ask has the facts Alan needs to answer without opening anything else.",
    },
  ],
} as const satisfies TextProperty
