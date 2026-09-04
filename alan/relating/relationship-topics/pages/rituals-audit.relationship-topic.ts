import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const ritualsAudit = {
  id: "019db533-f382-7198-b1fb-34d1bca70906",
  pageTypeSlug: "relationship-topic",
  slug: "rituals-audit",
  title: "Rituals Audit",
  relationshipTopicParentSlug: "being-intentional",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
