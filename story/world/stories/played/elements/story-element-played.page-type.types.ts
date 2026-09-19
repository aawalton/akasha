import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Doing } from "akasha/story/world/stories/played/elements/properties/doing.text-property.types.ts"
import type { ElementKind } from "akasha/story/world/stories/played/elements/properties/element-kind.select-property.types.ts"
import type { Feeling } from "akasha/story/world/stories/played/elements/properties/feeling.text-property.types.ts"
import type { Knowing } from "akasha/story/world/stories/played/elements/properties/knowing.text-property.types.ts"
import type { Perceiving } from "akasha/story/world/stories/played/elements/properties/perceiving.text-property.types.ts"
import type { PlayedStory } from "akasha/story/world/stories/played/elements/properties/played-story.relation-property.types.ts"
import type { TurnStates } from "akasha/story/world/stories/played/elements/properties/turn-states.file-property.types.ts"
import type { Wanting } from "akasha/story/world/stories/played/elements/properties/wanting.text-property.types.ts"

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
