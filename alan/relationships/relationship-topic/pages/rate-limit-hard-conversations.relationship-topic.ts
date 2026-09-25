import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const rateLimitHardConversations = {
  id: "019db533-f382-72de-8601-98c0945dc2a4",
  type: "page-type/relationship-topic",
  slug: "rate-limit-hard-conversations",
  title: "Rate Limit Hard Conversations",
  relationshipTopicParent: "relationship-topic/reducing-jen-s-load-in-2026",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
