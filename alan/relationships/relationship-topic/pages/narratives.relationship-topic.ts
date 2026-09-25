import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const narratives = {
  id: "019db533-f382-7478-bb5f-30b78e1118cd",
  type: "page-type/relationship-topic",
  slug: "narratives",
  title: "Narratives",
  relationshipTopicParent: "relationship-topic/shared",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
