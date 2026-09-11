import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.ownProgressInWords ?? 0) + (page.partsProgressInWords ?? 0)
  return Number.isFinite(answer) ? answer : null
}
