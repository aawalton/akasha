import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import type { PartsProgressInWords } from "akasha/alan/collection/properties/parts-progress-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = { readonly totalProgressInWords?: number }

export const work: Work<Collection, PartsProgressInWords> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Held>(partOfCollections.propertySlug)) {
    total += one.totalProgressInWords ?? 0
  }
  return total
}
