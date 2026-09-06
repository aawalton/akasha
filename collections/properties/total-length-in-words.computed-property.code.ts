import type { Work } from "@akasha/pages/computed-property"
import type { WorkedCollection } from "../collection.page-type.worked.ts"

export const work: Work<WorkedCollection, number> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) + (page.partsLengthInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
