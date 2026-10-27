import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"
import type { ChapterEndsAt } from "akasha/story/world/stories/played/chapters/properties/chapter-ends-at.instant-property.types.ts"
import type { ChapterTurnCovers } from "akasha/story/world/stories/played/chapters/properties/chapter-turn-covers.record-property.types.ts"
import type { ChapterTurnStarts } from "akasha/story/world/stories/played/chapters/properties/chapter-turn-starts.record-property.types.ts"
import type { LastTurn } from "akasha/story/world/stories/played/chapters/properties/last-turn.text-property.types.ts"
import type { LastTurnPosition } from "akasha/story/world/stories/played/chapters/properties/last-turn-position.number-property.types.ts"
import type { Outcomes } from "akasha/story/world/stories/played/turns/properties/outcomes.file-property.types.ts"

export type StoryChapterPlayed = Chapter & {
  turnCovers?: ChapterTurnCovers
  turnStarts?: ChapterTurnStarts
  lastTurn?: LastTurn
  lastTurnPosition?: LastTurnPosition
  endsAt?: ChapterEndsAt
  outcomes?: Outcomes
}
