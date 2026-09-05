import type { TextProperty } from "@akasha/pages-system/text-property"

export type TopicSettled = string

export const topicSettled = {
  id: "01a0655a-b2b5-7a06-9305-be9592eba1ec",
  pageTypeSlug: "text-property",
  slug: "topic-settled",
  propertySlug: "settled",
  definition: "what is worked out about a topic",
  max: 1000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This property holds what stands rather than what is still open.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line divides one paragraph from the next.",
    },
  ],
} as const satisfies TextProperty
