import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const defaultCancelStreamingServices = {
  id: "019db533-f382-7489-97eb-da02c2c0f385",
  type: "page-type/relationship-topic",
  slug: "default-cancel-streaming-services",
  title: "Default Cancel Streaming Services",
  relationshipTopicParent: "relationship-topic/coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
