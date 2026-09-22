import type { Page } from "akasha/page/page.page-type.types.ts"
import type { TurnNumber } from "akasha/story/game/turn/properties/turn-number.number-property.types.ts"
import type { TurnStory } from "akasha/story/turn/properties/turn-story.relation-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type Turn = Page & {
  story: TurnStory
  number: TurnNumber
  prose: Prose
}
