import type { Work } from "@akasha/pages/computed-property"
import type { WorkedCollection } from "../collection.page-type.worked.ts"

export const work: Work<WorkedCollection, number> = (page) => {
  const words = page.unitWords
  if (words === undefined) return null
  const answer = (page.totalRemainingInWords ?? 0) / words
  return Number.isFinite(answer) ? answer : null
}
