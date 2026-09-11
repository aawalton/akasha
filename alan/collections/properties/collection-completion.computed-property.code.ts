import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { CollectionCompletion } from "akasha/alan/collections/properties/collection-completion.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Collection, CollectionCompletion> = (page) => {
  const length = page.totalLengthInWords
  const remaining = page.totalRemainingInWords
  if (typeof length === "number" && length > 0) {
    if (typeof remaining === "number" && remaining <= 0) return "completed"
  }
  const progress = page.totalProgressInWords
  if (typeof progress === "number" && progress > 0) return "in-progress"
  return "not-started"
}
