import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { WithinCollections } from "akasha/alan/collection/properties/within-collections.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = { readonly withinCollections?: WithinCollections }

export const work: Work<Collection, WithinCollections> = (page, reach) => {
  const named = new Set<string>()
  for (const parent of page.partOfCollections ?? []) {
    named.add(parent)
    for (const one of reach.target<Held>(parent)?.withinCollections ?? []) named.add(one.collection)
  }
  if (named.size === 0) return null
  return [...named].map((collection) => ({ collection }))
}
