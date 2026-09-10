import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const gifts = {
  id: "019db533-f382-70fb-a18c-efc343c06c05",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "gifts",
  title: "Gifts",
  relationshipTopicParent: "being-intentional",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
