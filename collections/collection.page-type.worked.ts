import type { Collection } from "./collection.page-type.types.ts"
import type { CollectionCompletion } from "./properties/collection-completion.computed-property.ts"
import type { OwnLengthInWords } from "./properties/own-length-in-words.computed-property.ts"
import type { OwnProgressInWords } from "./properties/own-progress-in-words.computed-property.ts"
import type { OwnRemaining } from "./properties/own-remaining.computed-property.ts"
import type { OwnRemainingInWords } from "./properties/own-remaining-in-words.computed-property.ts"
import type { PartsRemainingInWords } from "./properties/parts-remaining-in-words.computed-property.ts"
import type { TotalLength } from "./properties/total-length.computed-property.ts"
import type { TotalLengthInWords } from "./properties/total-length-in-words.computed-property.ts"
import type { TotalProgress } from "./properties/total-progress.computed-property.ts"
import type { TotalProgressInWords } from "./properties/total-progress-in-words.computed-property.ts"
import type { TotalRemaining } from "./properties/total-remaining.computed-property.ts"
import type { TotalRemainingInWords } from "./properties/total-remaining-in-words.computed-property.ts"

export type WorkedCollection = Collection & {
  completion?: CollectionCompletion
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
}
