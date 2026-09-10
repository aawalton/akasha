import type { topicStatus } from "./topic-status.select-property.ts"

export type TopicStatus = (typeof topicStatus.values)[number]
