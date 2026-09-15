import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnRemainingInWords } from "akasha/alan/collection/properties/own-remaining-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, OwnRemainingInWords> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) - (page.ownProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
