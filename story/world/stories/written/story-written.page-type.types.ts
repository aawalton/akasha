import type { Story } from "akasha/story/story.page-type.types.ts"
import type { ChapterBacklog } from "akasha/story/world/stories/written/properties/chapter-backlog.number-property.types.ts"
import type { WordBacklog } from "akasha/story/world/stories/written/properties/word-backlog.number-property.types.ts"

export type StoryWritten = Story & {
  chapterBacklog?: ChapterBacklog
  wordBacklog?: WordBacklog
}
