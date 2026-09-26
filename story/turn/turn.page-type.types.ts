import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PartOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.types.ts"
import type { Position } from "akasha/alan/collection/properties/position.number-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type Turn = Collection & {
  partOfCollections: PartOfCollections
  position: Position
  prose?: Prose
}
