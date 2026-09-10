import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const expectationsForRetirement = {
  id: "019db533-f382-7135-bef3-6aac72822855",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "expectations-for-retirement",
  title: "Expectations For Retirement",
  relationshipTopicParent: "expectations-for-2026",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
