import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const defaultCancelStreamingServices = {
  id: "019db533-f382-7489-97eb-da02c2c0f385",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "default-cancel-streaming-services",
  title: "Default Cancel Streaming Services",
  relationshipTopicParent: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
