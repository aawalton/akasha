import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const bedtime = {
  id: "019db533-f382-7143-91ec-77275caee483",
  type: "page-type/relationship-topic",
  slug: "bedtime",
  title: "Bedtime",
  relationshipTopicParent: "relationship-topic/increase-support-from-alan",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "done",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
