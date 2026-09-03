import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const finances = {
  id: "019db533-f382-7221-9a5c-9d607d917eb6",
  pageTypeSlug: "relationship-topic",
  slug: "finances",
  title: "Finances",
  relationshipTopicParentSlug: "coordinate-on-family-projects",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
