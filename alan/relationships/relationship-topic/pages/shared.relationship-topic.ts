import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const shared = {
  id: "019db533-f382-7466-a0a3-da8efc51af64",
  type: "page-type/relationship-topic",
  slug: "shared",
  title: "Shared",
  relationshipTopicParent: "relationship-topic/interpersonal-pain-points",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
