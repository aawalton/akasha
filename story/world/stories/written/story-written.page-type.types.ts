import type { Story } from "akasha/story/story.page-type.types.ts"
import type { CoverReroll } from "akasha/story/world/stories/played/properties/cover-reroll.relation-property.types.ts"
import type { CoverRerollRefused } from "akasha/story/world/stories/played/properties/cover-reroll-refused.text-property.types.ts"
import type { WordBacklog } from "akasha/story/world/stories/written/properties/word-backlog.number-property.types.ts"

export type StoryWritten = Story & {
  wordBacklog?: WordBacklog
  coverReroll?: CoverReroll
  coverRerollRefused?: CoverRerollRefused
}
