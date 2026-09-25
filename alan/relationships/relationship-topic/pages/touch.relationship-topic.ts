import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const touch = {
  id: "019db533-f382-7129-b9a2-4feead8473d2",
  type: "page-type/relationship-topic",
  slug: "touch",
  title: "Touch",
  relationshipTopicParent: "relationship-topic/being-intentional",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
