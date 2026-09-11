import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { OwnRemainingInWords } from "akasha/alan/collections/properties/own-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, OwnRemainingInWords> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) - (page.ownProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
