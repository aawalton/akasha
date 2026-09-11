import type { RelationshipTopic } from "akasha/alan/relating/relationship-topics/relationship-topic.page-type.types.ts"

export const touch = {
  id: "019db533-f382-7129-b9a2-4feead8473d2",
  type: "relationship-topic",
  slug: "touch",
  title: "Touch",
  relationshipTopicParent: "being-intentional",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
