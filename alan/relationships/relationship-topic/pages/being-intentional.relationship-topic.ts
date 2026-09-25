import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const beingIntentional = {
  id: "019db533-f382-74be-ba39-dca5ac50ada8",
  type: "page-type/relationship-topic",
  slug: "being-intentional",
  title: "Being Intentional",
  relationshipTopicParent: "relationship-topic/marriage-relationship",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
