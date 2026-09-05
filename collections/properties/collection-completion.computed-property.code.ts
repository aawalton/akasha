import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedCollection } from "../collection.page-type.ts"
import type { CollectionCompletion } from "./collection-completion.computed-property.ts"

export const work: Work<WorkedCollection, CollectionCompletion> = (page) => {
  // A case row an absent value is read in matches nothing, so it falls to `otherwise`.
  const length = page.totalLengthInWords
  const remaining = page.totalRemainingInWords
  if (typeof length === "number" && length > 0) {
    if (typeof remaining === "number" && remaining <= 0) return "completed"
  }
  const progress = page.totalProgressInWords
  if (typeof progress === "number" && progress > 0) return "in-progress"
  return "not-started"
}
