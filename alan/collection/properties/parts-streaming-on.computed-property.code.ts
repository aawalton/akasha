import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = {
  readonly streamingOn?: readonly string[]
  readonly partsStreamingOn?: PartsStreamingOn
}

export const work: Work<Collection, PartsStreamingOn> = (_page, reach) => {
  const named = new Set<string>()
  for (const part of reach.naming<Held>(partOfCollections.propertySlug)) {
    for (const one of part.streamingOn ?? []) named.add(one)
    for (const one of part.partsStreamingOn ?? []) named.add(one.service)
  }
  if (named.size === 0) return null
  return [...named].sort().map((service) => ({ service }))
}
