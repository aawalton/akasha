import type { Story } from "akasha/story/story.page-type.types.ts"
import type { WordBacklog } from "akasha/story/world/stories/written/properties/word-backlog.number-property.types.ts"

export type StoryWritten = Story & {
  wordBacklog?: WordBacklog
}
