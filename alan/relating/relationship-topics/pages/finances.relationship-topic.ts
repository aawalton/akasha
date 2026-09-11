import type { RelationshipTopic } from "akasha/alan/relating/relationship-topics/relationship-topic.page-type.types.ts"

export const finances = {
  id: "019db533-f382-7221-9a5c-9d607d917eb6",
  type: "relationship-topic",
  slug: "finances",
  title: "Finances",
  relationshipTopicParent: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
