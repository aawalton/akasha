import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnProgressInWords } from "akasha/alan/collection/properties/own-progress-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, OwnProgressInWords> = (page) => {
  const answer = (page.ownProgress ?? 0) * (page.unitWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
