import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const ritualsAudit = {
  id: "019db533-f382-7198-b1fb-34d1bca70906",
  type: "page-type/relationship-topic",
  slug: "rituals-audit",
  title: "Rituals Audit",
  relationshipTopicParent: "relationship-topic/being-intentional",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "someday-maybe",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
