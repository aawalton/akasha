import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const invisibleContractsAudit = {
  id: "019db533-f382-711f-b7de-887c18c6729f",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "invisible-contracts-audit",
  title: "Invisible Contracts Audit",
  relationshipTopicParent: "being-intentional",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
