import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const safetyStocksAndFlows = {
  id: "019db533-f382-7275-95d2-60b4161537d8",
  type: "page-type/relationship-topic",
  slug: "safety-stocks-and-flows",
  title: "Safety Stocks And Flows",
  relationshipTopicParent: "relationship-topic/alan-feeling-safe",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "up-next",
} as const satisfies RelationshipTopic
