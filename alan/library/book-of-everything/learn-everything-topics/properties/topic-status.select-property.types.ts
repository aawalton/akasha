import type { topicStatus } from "akasha/alan/library/book-of-everything/learn-everything-topics/properties/topic-status.select-property.ts"

export type TopicStatus = (typeof topicStatus.values)[number]
