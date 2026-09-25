import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const expectationsForRetirement = {
  id: "019db533-f382-7135-bef3-6aac72822855",
  type: "page-type/relationship-topic",
  slug: "expectations-for-retirement",
  title: "Expectations For Retirement",
  relationshipTopicParent: "relationship-topic/expectations-for-2026",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
