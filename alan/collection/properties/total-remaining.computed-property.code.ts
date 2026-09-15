import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { TotalRemaining } from "akasha/alan/collection/properties/total-remaining.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, TotalRemaining> = (page) => {
  const words = page.unitWords
  if (words === undefined) return null
  const answer = (page.totalRemainingInWords ?? 0) / words
  return Number.isFinite(answer) ? answer : null
}
