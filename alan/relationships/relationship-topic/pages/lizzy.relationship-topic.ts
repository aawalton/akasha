import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const lizzy = {
  id: "019db533-f382-740f-88b8-17368c530bb2",
  type: "page-type/relationship-topic",
  slug: "lizzy",
  title: "Lizzy",
  relationshipTopicParent: "relationship-topic/parenting",
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
