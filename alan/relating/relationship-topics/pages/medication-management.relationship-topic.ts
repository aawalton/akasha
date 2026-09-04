import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const medicationManagement = {
  id: "019db533-f382-71f6-a1a8-aac9c98d9c0c",
  pageTypeSlug: "relationship-topic",
  slug: "medication-management",
  title: "Medication Management",
  relationshipTopicParentSlug: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "low",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
