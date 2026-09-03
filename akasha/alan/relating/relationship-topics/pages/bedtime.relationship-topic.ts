import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const bedtime = {
  id: "019db533-f382-7143-91ec-77275caee483",
  pageTypeSlug: "relationship-topic",
  slug: "bedtime",
  title: "Bedtime",
  relationshipTopicParentSlug: "increase-support-from-alan",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "done",
} as const satisfies RelationshipTopic
