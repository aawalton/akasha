import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const exerciseSpaceGuestRoomRecRoom = {
  id: "019db533-f382-714d-851d-c36ff1de4e52",
  type: "page-type/relationship-topic",
  slug: "exercise-space-guest-room-rec-room",
  title: "Exercise Space / Guest Room / Rec Room",
  relationshipTopicParent: "relationship-topic/long-term-vision-for-our-home",
  relationshipTopicPeople: ["person/jenny"],
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "someday-maybe",
} as const satisfies RelationshipTopic
