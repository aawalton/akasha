import type { RelationshipTopic } from "akasha/alan/relationships/relationship-topic/relationship-topic.page-type.types.ts"

export const rulesOfEngagement = {
  id: "019db533-f382-7515-9808-aa295420e4f5",
  type: "page-type/relationship-topic",
  slug: "rules-of-engagement",
  title: "Rules Of Engagement",
  relationshipTopicParent: "relationship-topic/marriage-relationship",
  relationshipTopicSensitivity: "high",
  relationshipTopicStatus: "up-next",
} as const satisfies RelationshipTopic
