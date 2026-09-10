import type { Page } from "../../pages/page.page-type.types.ts"
import type { Doing } from "./properties/doing.text-property.ts"
import type { ElementKind } from "./properties/element-kind.select-property.ts"
import type { Feeling } from "./properties/feeling.text-property.ts"
import type { Knowing } from "./properties/knowing.text-property.ts"
import type { Perceiving } from "./properties/perceiving.text-property.ts"
import type { PlayedStory } from "./properties/played-story.relation-property.ts"
import type { TurnStates } from "./properties/turn-states.file-property.ts"
import type { Wanting } from "./properties/wanting.text-property.ts"

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
