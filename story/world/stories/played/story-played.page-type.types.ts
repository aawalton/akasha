import type { Story } from "akasha/story/story.page-type.types.ts"
import type { Panels } from "akasha/story/world/stories/played/properties/panels.multi-relation-property.types.ts"

export type StoryPlayed = Story & {
  panels?: Panels
}
