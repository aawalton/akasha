import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const general = {
  id: "019db533-f381-7f34-9577-5ebc5b60f1f6",
  type: "page-type/relationship-topic",
  slug: "general",
  title: "General",
  relationshipTopicParent: "relationship-topic/parenting",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
