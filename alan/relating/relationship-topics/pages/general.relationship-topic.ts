import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const general = {
  id: "019db533-f381-7f34-9577-5ebc5b60f1f6",
  pageTypeSlug: "relationship-topic",
  slug: "general",
  title: "General",
  relationshipTopicParentSlug: "parenting",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
