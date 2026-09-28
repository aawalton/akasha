import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"
import type { ChapterTurnCovers } from "akasha/story/world/stories/played/chapters/properties/chapter-turn-covers.record-property.types.ts"

export type StoryChapterPlayed = Chapter & {
  turnCovers?: ChapterTurnCovers
}
