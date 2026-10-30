import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const topicSettled = {
  id: "01a0655a-b2b5-7a06-9305-be9592eba1ec",
  type: "page-type/text-property",
  slug: "topic-settled",
  propertySlug: "settled",
  definition: "the text about a topic that is settled",
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
  createdAt: "2026-09-03T03:40:37.941Z",
  updatedAt: "2026-10-30T15:04:18.566Z",
} as const satisfies TextProperty
