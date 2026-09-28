import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"
import type { ChapterTurnCovers } from "akasha/story/world/stories/played/chapters/properties/chapter-turn-covers.record-property.types.ts"
import type { LastTurn } from "akasha/story/world/stories/played/chapters/properties/last-turn.text-property.types.ts"
import type { LastTurnPosition } from "akasha/story/world/stories/played/chapters/properties/last-turn-position.number-property.types.ts"

export type StoryChapterPlayed = Chapter & {
  turnCovers?: ChapterTurnCovers
  lastTurn?: LastTurn
  lastTurnPosition?: LastTurnPosition
}
