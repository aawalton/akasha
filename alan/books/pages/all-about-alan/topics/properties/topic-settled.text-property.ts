import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TopicSettled = string

export const topicSettled = {
  id: "01a0655a-b2b5-7a06-9305-be9592eba1ec",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "topic-settled",
  propertySlug: "settled",
  definition: "what is worked out about a topic",
  maxLength: 1000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This property has the text that stands rather than the text still open.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line divides one paragraph from the next.",
    },
  ],
} as const satisfies TextProperty
