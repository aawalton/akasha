import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const coordinateOnFamilyProjects = {
  id: "019db533-f382-7188-bf19-38d0d4c2688f",
  type: "page-type/relationship-topic",
  slug: "coordinate-on-family-projects",
  title: "Coordinate On Family Projects",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "not-applicable",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
