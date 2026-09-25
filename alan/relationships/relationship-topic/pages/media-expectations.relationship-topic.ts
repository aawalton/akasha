import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const mediaExpectations = {
  id: "019db533-f382-74e1-b0b7-d71e644b6c83",
  type: "page-type/relationship-topic",
  slug: "media-expectations",
  title: "Media Expectations",
  relationshipTopicParent: "relationship-topic/general",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
