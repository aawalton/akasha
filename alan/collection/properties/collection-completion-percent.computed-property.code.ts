import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { CollectionCompletionPercent } from "akasha/alan/collection/properties/collection-completion-percent.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Collection, CollectionCompletionPercent> = (page) => {
  const length = page.totalLengthInWords
  if (typeof length !== "number" || length <= 0) return null
  const answer = ((page.totalProgressInWords ?? 0) / length) * 100
  return Number.isFinite(answer) ? Math.round(answer * 10) / 10 : null
}
