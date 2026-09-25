import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const financesBudget = {
  id: "019db533-f382-754a-8cf7-5eb82e5a556d",
  type: "page-type/relationship-topic",
  slug: "finances-budget",
  title: "Finances / Budget",
  relationshipTopicParent: "relationship-topic/family-values-culture-and-vision",
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
