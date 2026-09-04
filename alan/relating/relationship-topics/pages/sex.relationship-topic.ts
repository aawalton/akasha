import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const sex = {
  id: "019db533-f382-7538-96ad-7eb56153b787",
  pageTypeSlug: "relationship-topic",
  slug: "sex",
  title: "Sex",
  relationshipTopicParentSlug: "shared",
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
