import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const katara = {
  id: "019db533-f382-73b6-985f-1ab08f90e75c",
  type: "page-type/relationship-topic",
  slug: "katara",
  title: "Katara",
  relationshipTopicParent: "relationship-topic/parenting",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
