import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const jennyFeelingSafe = {
  id: "019db533-f382-7267-9261-de39edf492aa",
  type: "page-type/relationship-topic",
  slug: "jenny-feeling-safe",
  title: "Jenny Feeling Safe",
  relationshipTopicParent: "relationship-topic/rules-of-engagement",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
