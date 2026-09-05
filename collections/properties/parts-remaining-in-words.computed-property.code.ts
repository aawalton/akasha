import type { Work } from "@akasha/pages-system/computed-property"
import type { Collection } from "../collection.page-type.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.partsLengthInWords ?? 0) - (page.partsProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
