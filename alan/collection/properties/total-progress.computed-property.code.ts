import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { TotalProgress } from "akasha/alan/collection/properties/total-progress.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, TotalProgress> = (page) => {
  const words = page.unitWords
  if (words === undefined) return null
  const answer = (page.totalProgressInWords ?? 0) / words
  return Number.isFinite(answer) ? answer : null
}
