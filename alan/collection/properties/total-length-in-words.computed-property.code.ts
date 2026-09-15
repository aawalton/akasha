import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { TotalLengthInWords } from "akasha/alan/collection/properties/total-length-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, TotalLengthInWords> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) + (page.partsLengthInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
