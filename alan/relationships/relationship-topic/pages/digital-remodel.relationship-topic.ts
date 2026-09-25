import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const digitalRemodel = {
  id: "019db533-f382-74ac-9fa8-d1e622ff5e0e",
  type: "page-type/relationship-topic",
  slug: "digital-remodel",
  title: "Digital Remodel",
  relationshipTopicParent: "relationship-topic/coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
