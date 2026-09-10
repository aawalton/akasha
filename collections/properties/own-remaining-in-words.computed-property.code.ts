import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { Collection } from "../collection.page-type.types.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.ownLengthInWords ?? 0) - (page.ownProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
