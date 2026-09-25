import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const safetyAsAResourceBar = {
  id: "019db533-f382-7259-bb3a-a952fb7aefd9",
  type: "page-type/relationship-topic",
  slug: "safety-as-a-resource-bar",
  title: "Safety As A Resource Bar",
  relationshipTopicParent: "relationship-topic/alan-feeling-safe",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "done",
} as const satisfies RelationshipTopic
