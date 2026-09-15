import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Doing } from "akasha/story/element-played/properties/doing.text-property.types.ts"
import type { ElementKind } from "akasha/story/element-played/properties/element-kind.select-property.types.ts"
import type { Feeling } from "akasha/story/element-played/properties/feeling.text-property.types.ts"
import type { Knowing } from "akasha/story/element-played/properties/knowing.text-property.types.ts"
import type { Perceiving } from "akasha/story/element-played/properties/perceiving.text-property.types.ts"
import type { PlayedStory } from "akasha/story/element-played/properties/played-story.relation-property.types.ts"
import type { TurnStates } from "akasha/story/element-played/properties/turn-states.file-property.types.ts"
import type { Wanting } from "akasha/story/element-played/properties/wanting.text-property.types.ts"

export type StoryElementPlayed = Page & {
  playedStory: PlayedStory
  elementKind: ElementKind
  perceiving: Perceiving
  knowing: Knowing
  feeling: Feeling
  wanting: Wanting
  doing: Doing
  turnStates?: TurnStates
}
