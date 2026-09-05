import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedCollection } from "../collection.page-type.ts"

// A stored number that is not finite is read as absent, which is what `?? 0` met.
const counted = (held: number | undefined): number =>
  held === undefined || !Number.isFinite(held) ? 0 : held

export const work: Work<WorkedCollection, number> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) + counted(page.partsLengthInWords)
  return Number.isFinite(answer) ? answer : null
}
