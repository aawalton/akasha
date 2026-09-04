import type { TextProperty } from "@akasha/pages-system/text-property"

export type QuestionOffered = string

export const questionOffered = {
  id: "01a06823-89b2-7005-bff8-2e42db05c1e6",
  pageTypeSlug: "text-property",
  slug: "question-offered",
  propertySlug: "offered",
  definition: "an answer a question holds out for Alan to pick",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An offered answer is a whole answer rather than a label for one.",
    },
    {
      invariantKind: "departure",
      statement: "The offered answers stand in the order the question held them out in.",
    },
    {
      invariantKind: "absence",
      statement: "No offered answer says which one Alan took.",
    },
  ],
} as const satisfies TextProperty
