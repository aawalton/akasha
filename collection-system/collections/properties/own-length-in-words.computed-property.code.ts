import type { Work } from "@akasha/pages-system/computed-property"
import type { Collection } from "../collection.page-type.ts"

// A stored number that is not finite is read as absent, which is what `?? 0` met.
const counted = (held: number | undefined): number =>
  held === undefined || !Number.isFinite(held) ? 0 : held

export const work: Work<Collection, number> = (page) => {
  const answer = counted(page.ownLength) * counted(page.unitWords)
  return Number.isFinite(answer) ? answer : null
}
