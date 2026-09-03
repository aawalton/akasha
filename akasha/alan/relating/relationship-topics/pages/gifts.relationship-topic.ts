import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const gifts = {
  id: "019db533-f382-70fb-a18c-efc343c06c05",
  pageTypeSlug: "relationship-topic",
  slug: "gifts",
  title: "Gifts",
  relationshipTopicParentSlug: "being-intentional",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
