import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { Collection } from "../collection.page-type.types.ts"

export const work: Work<Collection, number> = (page) => {
  const words = page.unitWords
  if (words === undefined) return null
  const answer = (page.totalProgressInWords ?? 0) / words
  return Number.isFinite(answer) ? answer : null
}
