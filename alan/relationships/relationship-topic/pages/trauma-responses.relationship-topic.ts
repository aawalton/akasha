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
  createdAt: "2026-04-22T12:39:34.018Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationshipTopic
