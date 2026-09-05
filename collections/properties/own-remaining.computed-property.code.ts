import type { Work } from "@akasha/pages-system/computed-property"
import type { Collection } from "../collection.page-type.ts"

export const work: Work<Collection, number> = (page) => {
  const answer = (page.ownLength ?? 0) - (page.ownProgress ?? 0)
  return Number.isFinite(answer) ? answer : null
}
