import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { Story } from "akasha/story/story.page-type.types.ts"
import type { CoverReroll } from "akasha/story/world/stories/played/properties/cover-reroll.relation-property.types.ts"
import type { CoverRerollRefused } from "akasha/story/world/stories/played/properties/cover-reroll-refused.text-property.types.ts"
import type { Panels } from "akasha/story/world/stories/played/properties/panels.multi-relation-property.types.ts"
import type { StoryOpensAt } from "akasha/story/world/stories/played/properties/story-opens-at.instant-property.types.ts"

export type StoryPlayed = Story & {
  panels?: Panels
  externalId?: ExternalId
  opensAt?: StoryOpensAt
  coverReroll?: CoverReroll
  coverRerollRefused?: CoverRerollRefused
}
