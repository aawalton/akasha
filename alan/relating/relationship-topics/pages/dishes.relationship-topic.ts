import type { RelationshipTopic } from "akasha/alan/relating/relationship-topics/relationship-topic.page-type.types.ts"

export const dishes = {
  id: "019db533-f382-710c-9bd2-7608a88e6a3f",
  type: "relationship-topic",
  slug: "dishes",
  title: "Dishes",
  relationshipTopicParent: "increase-support-from-alan",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
