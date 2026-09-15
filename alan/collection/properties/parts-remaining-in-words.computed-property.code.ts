import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PartsRemainingInWords } from "akasha/alan/collection/properties/parts-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, PartsRemainingInWords> = (page) => {
  const answer = (page.partsLengthInWords ?? 0) - (page.partsProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
