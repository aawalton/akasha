import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { TotalProgressInWords } from "akasha/alan/collections/properties/total-progress-in-words.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, TotalProgressInWords> = (page) => {
  const answer = (page.ownProgressInWords ?? 0) + (page.partsProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
