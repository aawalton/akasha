import type { RelationshipTopic } from "akasha/alan/relating/relationship-topics/relationship-topic.page-type.types.ts"

export const medicationManagement = {
  id: "019db533-f382-71f6-a1a8-aac9c98d9c0c",
  type: "relationship-topic",
  slug: "medication-management",
  title: "Medication Management",
  relationshipTopicParent: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
