import type { CollectionAuthor } from "akasha/alan/collections/properties/collection-author.text-property.types.ts"
import type { CollectionCompletedAt } from "akasha/alan/collections/properties/collection-completed-at.instant-property.types.ts"
import type { CollectionCompletion } from "akasha/alan/collections/properties/collection-completion.computed-property.types.ts"
import type { CollectionPublishedAt } from "akasha/alan/collections/properties/collection-published-at.one-of-property.types.ts"
import type { CollectionTags } from "akasha/alan/collections/properties/collection-tags.text-property.types.ts"
import type { CollectionType } from "akasha/alan/collections/properties/collection-type.relation-property.types.ts"
import type { CollectionUnit } from "akasha/alan/collections/properties/collection-unit.relation-property.types.ts"
import type { Following } from "akasha/alan/collections/properties/following.boolean-property.types.ts"
import type { OwnLength } from "akasha/alan/collections/properties/own-length.number-property.types.ts"
import type { OwnLengthInWords } from "akasha/alan/collections/properties/own-length-in-words.computed-property.types.ts"
import type { OwnProgress } from "akasha/alan/collections/properties/own-progress.number-property.types.ts"
import type { OwnProgressInWords } from "akasha/alan/collections/properties/own-progress-in-words.computed-property.types.ts"
import type { OwnRemaining } from "akasha/alan/collections/properties/own-remaining.computed-property.types.ts"
import type { OwnRemainingInWords } from "akasha/alan/collections/properties/own-remaining-in-words.computed-property.types.ts"
import type { PartOfCollections } from "akasha/alan/collections/properties/part-of-collections.relation-property.types.ts"
import type { PartsLengthInWords } from "akasha/alan/collections/properties/parts-length-in-words.number-property.types.ts"
import type { PartsProgressInWords } from "akasha/alan/collections/properties/parts-progress-in-words.number-property.types.ts"
import type { PartsRemainingInWords } from "akasha/alan/collections/properties/parts-remaining-in-words.computed-property.types.ts"
import type { Position } from "akasha/alan/collections/properties/position.number-property.types.ts"
import type { Rank } from "akasha/alan/collections/properties/rank.rank-property.types.ts"
import type { Status } from "akasha/alan/collections/properties/status.select-property.types.ts"
import type { TotalLength } from "akasha/alan/collections/properties/total-length.computed-property.types.ts"
import type { TotalLengthInWords } from "akasha/alan/collections/properties/total-length-in-words.computed-property.types.ts"
import type { TotalProgress } from "akasha/alan/collections/properties/total-progress.computed-property.types.ts"
import type { TotalProgressInWords } from "akasha/alan/collections/properties/total-progress-in-words.computed-property.types.ts"
import type { TotalRemaining } from "akasha/alan/collections/properties/total-remaining.computed-property.types.ts"
import type { TotalRemainingInWords } from "akasha/alan/collections/properties/total-remaining-in-words.computed-property.types.ts"
import type { UnitWords } from "akasha/alan/collections/properties/unit-words.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Description } from "akasha/pages/properties/description.text-property.types.ts"

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
