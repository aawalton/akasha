import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const garageSalePile = {
  id: "019db533-f382-73ec-af49-9279840dcbe7",
  type: "page-type/relationship-topic",
  slug: "garage-sale-pile",
  title: "Garage Sale Pile",
  relationshipTopicParent: "relationship-topic/long-term-vision-for-our-home",
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
