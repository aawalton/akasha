import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedCollection } from "../collection.page-type.ts"

export const work: Work<WorkedCollection, number> = (page) => {
  // The formula divides by `{unit-words}` with no `?? 0`, so an absent divisor answers absent.
  const words = page.unitWords
  if (words === undefined || !Number.isFinite(words)) return null
  const answer = (page.totalRemainingInWords ?? 0) / words
  // Dividing by zero answers absent too.
  return Number.isFinite(answer) ? answer : null
}
