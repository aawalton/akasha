import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { TotalRemainingInWords } from "akasha/alan/collections/properties/total-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, TotalRemainingInWords> = (page) => {
  const answer = (page.totalLengthInWords ?? 0) - (page.totalProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
