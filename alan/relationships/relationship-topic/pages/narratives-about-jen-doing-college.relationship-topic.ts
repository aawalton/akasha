import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const narrativesAboutJenDoingCollege = {
  id: "019db533-f381-7f45-8faa-99b522ad7e9d",
  type: "page-type/relationship-topic",
  slug: "narratives-about-jen-doing-college",
  title: "Narratives About Jen Doing College",
  relationshipTopicParent: "relationship-topic/narratives",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
