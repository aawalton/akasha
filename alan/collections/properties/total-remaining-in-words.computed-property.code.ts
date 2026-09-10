import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { Collection } from "../collection.page-type.types.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.totalLengthInWords ?? 0) - (page.totalProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
