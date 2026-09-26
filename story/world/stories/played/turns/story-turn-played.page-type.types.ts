import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { Characters } from "akasha/story/character/properties/characters.multi-relation-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { Rolls } from "akasha/story/world/stories/played/turns/properties/rolls.file-property.types.ts"
import type { TurnAction } from "akasha/story/world/stories/played/turns/properties/turn-action.text-property.types.ts"
import type { TurnBeats } from "akasha/story/world/stories/played/turns/properties/turn-beats.text-property.types.ts"
import type { TurnIssues } from "akasha/story/world/stories/played/turns/properties/turn-issues.text-property.types.ts"
import type { TurnStatus } from "akasha/story/world/stories/played/turns/properties/turn-status.relation-property.types.ts"

export type StoryTurnPlayed = Collection & {
  prose?: Prose
  rolls?: Rolls
  characters?: Characters
  turnStatus: TurnStatus
  action?: TurnAction
  beats?: TurnBeats
  issues?: TurnIssues
}
