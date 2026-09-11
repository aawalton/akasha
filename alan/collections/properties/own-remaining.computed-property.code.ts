import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.ownLength ?? 0) - (page.ownProgress ?? 0)
  return Number.isFinite(answer) ? answer : null
}
