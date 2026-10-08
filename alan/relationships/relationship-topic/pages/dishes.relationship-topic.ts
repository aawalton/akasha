import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const dishes = {
  id: "019db533-f382-710c-9bd2-7608a88e6a3f",
  type: "page-type/relationship-topic",
  slug: "dishes",
  title: "Dishes",
  relationshipTopicParent: "relationship-topic/increase-support-from-alan",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "planned",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
