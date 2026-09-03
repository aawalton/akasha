import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const attraction = {
  id: "019db533-f382-73c9-abd9-9ff9605f5fa2",
  pageTypeSlug: "relationship-topic",
  slug: "attraction",
  title: "Attraction",
  relationshipTopicParentSlug: "shared",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
