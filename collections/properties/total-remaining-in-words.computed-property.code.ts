import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { WorkedCollection } from "../collection.page-type.worked.ts"

export const work: Work<WorkedCollection, number> = (page) => {
  const answer = (page.totalLengthInWords ?? 0) - (page.totalProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
