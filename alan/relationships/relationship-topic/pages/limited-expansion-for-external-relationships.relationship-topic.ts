import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const limitedExpansionForExternalRelationships = {
  id: "019db533-f382-71c6-932f-c21a8b74fa7c",
  type: "page-type/relationship-topic",
  slug: "limited-expansion-for-external-relationships",
  title: "Limited Expansion For External Relationships",
  relationshipTopicParent: "relationship-topic/whitelist-specific-expansions",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
