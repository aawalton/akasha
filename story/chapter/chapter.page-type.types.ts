import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collection/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { BeatChanges } from "akasha/story/chapter/properties/beat-changes.file-property.types.ts"
import type { BeatScenes } from "akasha/story/chapter/properties/beat-scenes.record-property.types.ts"
import type { ChapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.types.ts"
import type { StepBeats } from "akasha/story/chapter/properties/step-beats.text-property.types.ts"
import type { StepIssues } from "akasha/story/chapter/properties/step-issues.text-property.types.ts"
import type { StepLore } from "akasha/story/chapter/properties/step-lore.multi-relation-property.types.ts"
import type { StepMechanicsIssues } from "akasha/story/chapter/properties/step-mechanics-issues.text-property.types.ts"
import type { StepRecordedBy } from "akasha/story/chapter/properties/step-recorded-by.multi-relation-property.types.ts"
import type { StepReviewedBy } from "akasha/story/chapter/properties/step-reviewed-by.multi-relation-property.types.ts"
import type { StepStatus } from "akasha/story/chapter/properties/step-status.relation-property.types.ts"
import type { Characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type Chapter = Collection & {
  title: Title
  story: ChapterStory
  ownLength: OwnLength
  prose: Prose
  stepStatus?: StepStatus
  beats?: StepBeats
  beatScenes?: BeatScenes
  beatChanges?: BeatChanges
  mechanicsIssues?: StepMechanicsIssues
  issues?: StepIssues
  lore?: StepLore
  characters?: Characters
  reviewedBy?: StepReviewedBy
  recordedBy?: StepRecordedBy
}
