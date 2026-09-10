import type { LearnEverythingTopic } from "./learn-everything-topic.page-type.types.ts"
import type { TopicCoverage } from "./properties/topic-coverage.computed-property.ts"

export type WorkedLearnEverythingTopic = LearnEverythingTopic & {
  coverage?: TopicCoverage
}
