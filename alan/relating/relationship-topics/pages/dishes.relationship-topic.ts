import type { RelationshipTopic } from "../relationship-topic.page-type.ts"

export const dishes = {
  id: "019db533-f382-710c-9bd2-7608a88e6a3f",
  pageTypeSlug: "relationship-topic",
  slug: "dishes",
  title: "Dishes",
  relationshipTopicParentSlug: "increase-support-from-alan",
  relationshipTopicPersonSlugs: ["jenny"],
  relationshipTopicSensitivity: "medium",
  relationshipTopicStatus: "planned",
} as const satisfies RelationshipTopic
