import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const sex = {
  id: "019db533-f382-7538-96ad-7eb56153b787",
  type: "page-type/relationship-topic",
  slug: "sex",
  title: "Sex",
  relationshipTopicParent: "relationship-topic/shared",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
