import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const bedtime = {
  id: "019db533-f382-7143-91ec-77275caee483",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "bedtime",
  title: "Bedtime",
  relationshipTopicParent: "increase-support-from-alan",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "done",
} as const satisfies RelationshipTopic
