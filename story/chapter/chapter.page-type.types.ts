import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collection/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Beats } from "akasha/story/chapter/properties/beats.file-property.types.ts"
import type { ChapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.types.ts"
import type { Issues } from "akasha/story/chapter/properties/issues.file-property.types.ts"
import type { MechanicsIssues } from "akasha/story/chapter/properties/mechanics-issues.file-property.types.ts"
import type { Rulings } from "akasha/story/chapter/properties/rulings.file-property.types.ts"
import type { StepLore } from "akasha/story/chapter/properties/step-lore.multi-relation-property.types.ts"
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
  beats?: Beats
  mechanicsIssues?: MechanicsIssues
  issues?: Issues
  lore?: StepLore
  characters?: Characters
  reviewedBy?: StepReviewedBy
  recordedBy?: StepRecordedBy
  rulings?: Rulings
}
