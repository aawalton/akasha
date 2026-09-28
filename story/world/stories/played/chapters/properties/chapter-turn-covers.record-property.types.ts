import type { Position } from "akasha/alan/collection/properties/position.number-property.types.ts"
import type { Cover } from "akasha/page/properties/cover.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ChapterTurnCovers = List<{
  position: Position
  cover: Cover
}>
