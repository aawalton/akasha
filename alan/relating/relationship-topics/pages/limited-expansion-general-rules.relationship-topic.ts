import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const limitedExpansionGeneralRules = {
  id: "019db533-f382-71e0-9a71-4d6c9b7763f9",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "limited-expansion-general-rules",
  title: "Limited Expansion General Rules",
  relationshipTopicParent: "whitelist-specific-expansions",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
