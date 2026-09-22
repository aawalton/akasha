import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import type { PartsLengthInWords } from "akasha/alan/collection/properties/parts-length-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = { readonly totalLengthInWords?: number }

export const work: Work<Collection, PartsLengthInWords> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Held>(partOfCollections.propertySlug)) {
    total += one.totalLengthInWords ?? 0
  }
  return total
}
