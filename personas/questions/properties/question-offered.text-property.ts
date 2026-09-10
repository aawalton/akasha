import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type QuestionOffered = List<string>

export const questionOffered = {
  id: "01a06823-89b2-7005-bff8-2e42db05c1e6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "question-offered",
  propertySlug: "offered",
  definition: "an answer a question holds out for Alan to pick",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An offered answer is a whole answer rather than a label for that answer.",
    },
    {
      invariantKind: "departure",
      statement: "The offered answers keep the order the question held those answers out in.",
    },
    {
      invariantKind: "absence",
      statement: "No offered answer says which answer Alan took.",
    },
  ],
} as const satisfies TextProperty
