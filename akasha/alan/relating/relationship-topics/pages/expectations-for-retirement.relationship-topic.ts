import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const expectationsForRetirement = {
  id: "019db533-f382-7135-bef3-6aac72822855",
  pageTypeSlug: "relationship-topic",
  slug: "expectations-for-retirement",
  title: "Expectations For Retirement",
  relationshipTopicParentSlug: "expectations-for-2026",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
