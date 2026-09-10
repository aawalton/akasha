import type { Page } from "../pages/page.page-type.ts"
import type { Description } from "../pages/properties/description.text-property.ts"
import type { CollectionAuthor } from "./properties/collection-author.text-property.ts"
import type { CollectionCompletedAt } from "./properties/collection-completed-at.instant-property.ts"
import type { CollectionCompletion } from "./properties/collection-completion.computed-property.ts"
import type { CollectionPublishedAt } from "./properties/collection-published-at.one-of-property.ts"
import type { CollectionTags } from "./properties/collection-tags.text-property.ts"
import type { CollectionType } from "./properties/collection-type.relation-property.ts"
import type { CollectionUnit } from "./properties/collection-unit.relation-property.ts"
import type { Following } from "./properties/following.boolean-property.ts"
import type { OwnLength } from "./properties/own-length.number-property.ts"
import type { OwnLengthInWords } from "./properties/own-length-in-words.computed-property.ts"
import type { OwnProgress } from "./properties/own-progress.number-property.ts"
import type { OwnProgressInWords } from "./properties/own-progress-in-words.computed-property.ts"
import type { OwnRemaining } from "./properties/own-remaining.computed-property.ts"
import type { OwnRemainingInWords } from "./properties/own-remaining-in-words.computed-property.ts"
import type { PartOfCollections } from "./properties/part-of-collections.relation-property.ts"
import type { PartsLengthInWords } from "./properties/parts-length-in-words.number-property.ts"
import type { PartsProgressInWords } from "./properties/parts-progress-in-words.number-property.ts"
import type { PartsRemainingInWords } from "./properties/parts-remaining-in-words.computed-property.ts"
import type { Position } from "./properties/position.number-property.ts"
import type { Rank } from "./properties/rank.rank-property.ts"
import type { Status } from "./properties/status.select-property.ts"
import type { TotalLength } from "./properties/total-length.computed-property.ts"
import type { TotalLengthInWords } from "./properties/total-length-in-words.computed-property.ts"
import type { TotalProgress } from "./properties/total-progress.computed-property.ts"
import type { TotalProgressInWords } from "./properties/total-progress-in-words.computed-property.ts"
import type { TotalRemaining } from "./properties/total-remaining.computed-property.ts"
import type { TotalRemainingInWords } from "./properties/total-remaining-in-words.computed-property.ts"
import type { UnitWords } from "./properties/unit-words.number-property.ts"

export type Collection = Page & {
  author?: CollectionAuthor
  completedAt?: CollectionCompletedAt
  description?: Description
  following?: Following
  ownLength?: OwnLength
  ownProgress?: OwnProgress
  partOfCollections?: PartOfCollections
  position?: Position
  publishedAt?: CollectionPublishedAt
  rank?: Rank
  status?: Status
  tags?: CollectionTags
  unit?: CollectionUnit
  completion?: CollectionCompletion
  collectionType?: CollectionType
  ownLengthInWords?: OwnLengthInWords
  ownProgressInWords?: OwnProgressInWords
  ownRemaining?: OwnRemaining
  ownRemainingInWords?: OwnRemainingInWords
  partsRemainingInWords?: PartsRemainingInWords
  totalLength?: TotalLength
  totalLengthInWords?: TotalLengthInWords
  totalProgress?: TotalProgress
  totalProgressInWords?: TotalProgressInWords
  totalRemaining?: TotalRemaining
  totalRemainingInWords?: TotalRemainingInWords
  partsLengthInWords?: PartsLengthInWords
  partsProgressInWords?: PartsProgressInWords
  unitWords?: UnitWords
}
