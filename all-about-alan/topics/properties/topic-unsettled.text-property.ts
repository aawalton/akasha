import type { TextProperty } from "@akasha/pages-system/text-property"

export type TopicUnsettled = string

export const topicUnsettled = {
  id: "01a0655a-b2b5-7a7e-b4c0-593cf353f845",
  pageTypeSlug: "text-property",
  slug: "topic-unsettled",
  propertySlug: "unsettled",
  definition: "what is still open about a topic",
  max: 1000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This holds what is still open rather than what stands.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line divides one paragraph from the next.",
    },
  ],
} as const satisfies TextProperty
