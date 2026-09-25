import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const joseph = {
  id: "019db533-f382-74f2-b3ef-2b43661ac713",
  type: "page-type/relationship-topic",
  slug: "joseph",
  title: "Joseph",
  relationshipTopicParent: "relationship-topic/parenting",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
