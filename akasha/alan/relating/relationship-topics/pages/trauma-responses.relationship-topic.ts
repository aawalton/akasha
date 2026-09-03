import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const traumaResponses = {
  id: "019db533-f382-70e4-9008-a25f20f24124",
  pageTypeSlug: "relationship-topic",
  slug: "trauma-responses",
  title: "Trauma Responses",
  relationshipTopicParentSlug: "alan",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
