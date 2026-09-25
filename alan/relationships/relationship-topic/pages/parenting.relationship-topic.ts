import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const parenting = {
  id: "019db533-f382-749b-8ed9-6686c5aee7e1",
  type: "page-type/relationship-topic",
  slug: "parenting",
  title: "Parenting",
  relationshipTopicParent: "relationship-topic/family-values-culture-and-vision",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
