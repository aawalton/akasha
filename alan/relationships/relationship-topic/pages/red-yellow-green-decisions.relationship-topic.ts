import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const redYellowGreenDecisions = {
  id: "019db533-f382-731c-8aff-a509ab7f1649",
  type: "page-type/relationship-topic",
  slug: "red-yellow-green-decisions",
  title: "Red, Yellow, Green Decisions",
  relationshipTopicParent: "relationship-topic/mental-models",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
