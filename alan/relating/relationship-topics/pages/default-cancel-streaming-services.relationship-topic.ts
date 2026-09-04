import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const defaultCancelStreamingServices = {
  id: "019db533-f382-7489-97eb-da02c2c0f385",
  pageTypeSlug: "relationship-topic",
  slug: "default-cancel-streaming-services",
  title: "Default Cancel Streaming Services",
  relationshipTopicParentSlug: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
