import type { BeatChanges } from "akasha/story/chapter/properties/beat-changes.file-property.types.ts"
import type { BeatScenes } from "akasha/story/chapter/properties/beat-scenes.record-property.types.ts"
import type { StepBeats } from "akasha/story/chapter/properties/step-beats.text-property.types.ts"
import type { StepIssues } from "akasha/story/chapter/properties/step-issues.text-property.types.ts"
import type { StepLore } from "akasha/story/chapter/properties/step-lore.multi-relation-property.types.ts"
import type { StepMechanicsIssues } from "akasha/story/chapter/properties/step-mechanics-issues.text-property.types.ts"
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
  beats?: StepBeats
  beatScenes?: BeatScenes
  beatChanges?: BeatChanges
  mechanicsIssues?: StepMechanicsIssues
  issues?: StepIssues
  lore?: StepLore
  reviewedBy?: StepReviewedBy
  recordedBy?: StepRecordedBy
  endsAt?: TurnEndsAt
  coverAfter?: CoverAfter
}
