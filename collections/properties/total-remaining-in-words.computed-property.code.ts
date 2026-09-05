import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedCollection } from "../collection.page-type.ts"

export const work: Work<WorkedCollection, number> = (page) => {
  const answer = (page.totalLengthInWords ?? 0) - (page.totalProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
