import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const topicSettled = {
  id: "01a0655a-b2b5-7a06-9305-be9592eba1ec",
  type: "page-type/text-property",
  slug: "topic-settled",
  propertySlug: "settled",
  definition: "what is worked out about a topic",
  maxLength: 1000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This property has the text that stands rather than the text still open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line divides one paragraph from the next.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
