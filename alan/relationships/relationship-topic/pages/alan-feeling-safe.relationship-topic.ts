import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const alanFeelingSafe = {
  id: "019db533-f382-7504-a480-6862f95ebe46",
  type: "page-type/relationship-topic",
  slug: "alan-feeling-safe",
  title: "Alan Feeling Safe",
  relationshipTopicParent: "relationship-topic/rules-of-engagement",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "up-next",
} as const satisfies RelationshipTopic
