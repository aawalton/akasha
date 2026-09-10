import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const propaganda = {
  id: "019db533-f382-7348-8b72-0702f32ad418",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "propaganda",
  title: "Propaganda",
  relationshipTopicParent: "shared",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
