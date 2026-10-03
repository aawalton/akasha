import type { Beats } from "akasha/story/chapter/properties/beats.file-property.types.ts"
import type { Issues } from "akasha/story/chapter/properties/issues.file-property.types.ts"
import type { MechanicsIssues } from "akasha/story/chapter/properties/mechanics-issues.file-property.types.ts"
import type { StepLore } from "akasha/story/chapter/properties/step-lore.multi-relation-property.types.ts"
import type { StepMechanicsSentBack } from "akasha/story/chapter/properties/step-mechanics-sent-back.boolean-property.types.ts"
import type { StepRecordedBy } from "akasha/story/chapter/properties/step-recorded-by.multi-relation-property.types.ts"
import type { StepReviewedBy } from "akasha/story/chapter/properties/step-reviewed-by.multi-relation-property.types.ts"
import type { StepStatus } from "akasha/story/chapter/properties/step-status.relation-property.types.ts"
import type { Turn } from "akasha/story/turn/turn.page-type.types.ts"
import type { Characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.types.ts"
import type { CoverAfter } from "akasha/story/world/stories/played/turns/properties/cover-after.text-property.types.ts"
import type { Outcomes } from "akasha/story/world/stories/played/turns/properties/outcomes.file-property.types.ts"
import type { TurnAction } from "akasha/story/world/stories/played/turns/properties/turn-action.text-property.types.ts"
import type { TurnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.types.ts"

export type StoryTurnPlayed = Turn & {
  outcomes?: Outcomes
  characters?: Characters
  stepStatus: StepStatus
  action?: TurnAction
  beats?: Beats
  mechanicsIssues?: MechanicsIssues
  mechanicsSentBack?: StepMechanicsSentBack
  issues?: Issues
  lore?: StepLore
  reviewedBy?: StepReviewedBy
  recordedBy?: StepRecordedBy
  endsAt?: TurnEndsAt
  coverAfter?: CoverAfter
}
