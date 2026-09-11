import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { PartsRemainingInWords } from "akasha/alan/collections/properties/parts-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, PartsRemainingInWords> = (page) => {
  const answer = (page.partsLengthInWords ?? 0) - (page.partsProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
