import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const involvement = {
  id: "019db533-f382-72ae-b5b8-6bb74717200a",
  type: "page-type/relationship-topic",
  slug: "involvement",
  title: "Involvement",
  relationshipTopicParent: "relationship-topic/shared",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
