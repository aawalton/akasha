import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const alan = {
  id: "019db533-f382-7158-a470-03266e4f50c9",
  type: "page-type/relationship-topic",
  slug: "alan",
  title: "Alan",
  relationshipTopicParent: "relationship-topic/interpersonal-pain-points",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
