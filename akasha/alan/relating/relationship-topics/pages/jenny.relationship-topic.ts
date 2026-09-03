import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const jenny = {
  id: "019db533-f382-716f-9f82-be5c76041304",
  pageTypeSlug: "relationship-topic",
  slug: "jenny",
  title: "Jenny",
  relationshipTopicParentSlug: "interpersonal-pain-points",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
