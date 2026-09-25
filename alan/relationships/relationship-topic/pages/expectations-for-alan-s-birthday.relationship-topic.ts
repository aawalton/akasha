import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const expectationsForAlanSBirthday = {
  id: "019db533-f382-7420-86df-5886cfeac6af",
  type: "page-type/relationship-topic",
  slug: "expectations-for-alan-s-birthday",
  title: "Expectations For Alan’s Birthday",
  relationshipTopicParent: "relationship-topic/expectations-for-2026",
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "up-next",
} as const satisfies RelationshipTopic
