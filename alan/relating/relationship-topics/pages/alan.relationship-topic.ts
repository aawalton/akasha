import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const alan = {
  id: "019db533-f382-7158-a470-03266e4f50c9",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "alan",
  title: "Alan",
  relationshipTopicParent: "interpersonal-pain-points",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
