import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const touch = {
  id: "019db533-f382-7129-b9a2-4feead8473d2",
  pageTypeSlug: "relationship-topic",
  slug: "touch",
  title: "Touch",
  relationshipTopicParentSlug: "being-intentional",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
