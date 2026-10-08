import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const marriageRelationship = {
  id: "019db533-f382-71a4-b5fc-4dd95b8f7927",
  type: "page-type/relationship-topic",
  slug: "marriage-relationship",
  title: "Marriage Relationship",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
