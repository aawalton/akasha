import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { TotalRemainingInWords } from "akasha/alan/collection/properties/total-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, TotalRemainingInWords> = (page) => {
  const answer = (page.totalLengthInWords ?? 0) - (page.totalProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
