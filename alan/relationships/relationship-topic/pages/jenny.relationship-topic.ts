import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const jenny = {
  id: "019db533-f382-716f-9f82-be5c76041304",
  type: "page-type/relationship-topic",
  slug: "jenny",
  title: "Jenny",
  relationshipTopicParent: "relationship-topic/interpersonal-pain-points",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
