import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const marriageRelationship = {
  id: "019db533-f382-71a4-b5fc-4dd95b8f7927",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "marriage-relationship",
  title: "Marriage Relationship",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
