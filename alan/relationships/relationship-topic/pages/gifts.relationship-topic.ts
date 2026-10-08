import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const gifts = {
  id: "019db533-f382-70fb-a18c-efc343c06c05",
  type: "page-type/relationship-topic",
  slug: "gifts",
  title: "Gifts",
  relationshipTopicParent: "relationship-topic/being-intentional",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
