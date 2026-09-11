import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Doing } from "akasha/story/elements-played/properties/doing.text-property.ts"
import type { ElementKind } from "akasha/story/elements-played/properties/element-kind.select-property.types.ts"
import type { Feeling } from "akasha/story/elements-played/properties/feeling.text-property.ts"
import type { Knowing } from "akasha/story/elements-played/properties/knowing.text-property.ts"
import type { Perceiving } from "akasha/story/elements-played/properties/perceiving.text-property.ts"
import type { PlayedStory } from "akasha/story/elements-played/properties/played-story.relation-property.types.ts"
import type { TurnStates } from "akasha/story/elements-played/properties/turn-states.file-property.ts"
import type { Wanting } from "akasha/story/elements-played/properties/wanting.text-property.ts"

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
