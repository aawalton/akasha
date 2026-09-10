import type { RelationshipTopic } from "../relationship-topic.page-type.types.ts"

export const narrativesAboutJenDoingCollege = {
  id: "019db533-f381-7f45-8faa-99b522ad7e9d",
  pageTypeSlug: "relationship-topic",
  type: "relationship-topic",
  slug: "narratives-about-jen-doing-college",
  title: "Narratives About Jen Doing College",
  relationshipTopicParent: "narratives",
  relationshipTopicPeople: ["jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
