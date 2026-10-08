import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const finances = {
  id: "019db533-f382-7221-9a5c-9d607d917eb6",
  type: "page-type/relationship-topic",
  slug: "finances",
  title: "Finances",
  relationshipTopicParent: "relationship-topic/coordinate-on-family-projects",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "planned",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
