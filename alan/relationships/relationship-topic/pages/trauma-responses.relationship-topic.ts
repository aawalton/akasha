import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const traumaResponses = {
  id: "019db533-f382-70e4-9008-a25f20f24124",
  type: "page-type/relationship-topic",
  slug: "trauma-responses",
  title: "Trauma Responses",
  relationshipTopicParent: "relationship-topic/alan",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "critical",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
