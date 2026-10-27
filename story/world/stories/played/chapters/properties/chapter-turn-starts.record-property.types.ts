import type { Position } from "akasha/alan/collection/properties/position.number-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { TurnStartParagraph } from "akasha/story/world/stories/played/chapters/properties/turn-start-paragraph.number-property.types.ts"

export type ChapterTurnStarts = List<{
  position: Position
  paragraph: TurnStartParagraph
}>
