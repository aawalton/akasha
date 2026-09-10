import type { Work } from "@akasha/pages/computed-property"
import type { Collection } from "../collection.page-type.types.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.ownLength ?? 0) - (page.ownProgress ?? 0)
  return Number.isFinite(answer) ? answer : null
}
