import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnRemaining } from "akasha/alan/collection/properties/own-remaining.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, OwnRemaining> = (page) => {
  const answer = (page.ownLength ?? 0) - (page.ownProgress ?? 0)
  return Number.isFinite(answer) ? answer : null
}
