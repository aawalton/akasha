import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { OwnLengthInWords } from "akasha/alan/collections/properties/own-length-in-words.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, OwnLengthInWords> = (page) => {
  const answer = (page.ownLength ?? 0) * (page.unitWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
