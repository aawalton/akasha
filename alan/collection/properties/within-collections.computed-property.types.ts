import type { WithinCollection } from "akasha/alan/collection/properties/within-collection.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type WithinCollections = List<{
  collection: WithinCollection
}>
