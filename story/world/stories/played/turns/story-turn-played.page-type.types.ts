import type { Turn } from "akasha/story/turn/turn.page-type.types.ts"
import type { Characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.types.ts"
import type { Outcomes } from "akasha/story/world/stories/played/turns/properties/outcomes.file-property.types.ts"
import type { TurnAction } from "akasha/story/world/stories/played/turns/properties/turn-action.text-property.types.ts"
import type { TurnBeats } from "akasha/story/world/stories/played/turns/properties/turn-beats.text-property.types.ts"
import type { TurnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.types.ts"
import type { TurnIssues } from "akasha/story/world/stories/played/turns/properties/turn-issues.text-property.types.ts"
import type { TurnLore } from "akasha/story/world/stories/played/turns/properties/turn-lore.multi-relation-property.types.ts"
import type { TurnRecordedBy } from "akasha/story/world/stories/played/turns/properties/turn-recorded-by.multi-relation-property.types.ts"
import type { TurnReviewedBy } from "akasha/story/world/stories/played/turns/properties/turn-reviewed-by.multi-relation-property.types.ts"
import type { TurnStatus } from "akasha/story/world/stories/played/turns/properties/turn-status.relation-property.types.ts"

export type StoryTurnPlayed = Turn & {
  outcomes?: Outcomes
  characters?: Characters
  turnStatus: TurnStatus
  action?: TurnAction
  beats?: TurnBeats
  issues?: TurnIssues
  lore?: TurnLore
  reviewedBy?: TurnReviewedBy
  recordedBy?: TurnRecordedBy
  endsAt?: TurnEndsAt
}
