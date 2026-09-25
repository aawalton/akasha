import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const attraction = {
  id: "019db533-f382-73c9-abd9-9ff9605f5fa2",
  type: "page-type/relationship-topic",
  slug: "attraction",
  title: "Attraction",
  relationshipTopicParent: "relationship-topic/shared",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
