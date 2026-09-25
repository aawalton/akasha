import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const medicationManagement = {
  id: "019db533-f382-71f6-a1a8-aac9c98d9c0c",
  type: "page-type/relationship-topic",
  slug: "medication-management",
  title: "Medication Management",
  relationshipTopicParent: "relationship-topic/coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
