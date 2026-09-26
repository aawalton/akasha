import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { Rolls } from "akasha/story/world/stories/played/turns/properties/rolls.file-property.types.ts"
import type { TurnPersonas } from "akasha/story/world/stories/played/turns/properties/turn-personas.multi-relation-property.types.ts"

export type StoryTurnPlayed = Collection & {
  prose: Prose
  rolls?: Rolls
  personas?: TurnPersonas
}
