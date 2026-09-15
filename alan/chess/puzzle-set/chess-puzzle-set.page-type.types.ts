import type { Puzzles } from "akasha/alan/chess/puzzle-set/properties/puzzles.page-property-entry.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ChessPuzzleSet = Page & {
  title: Title
  puzzles?: Puzzles
}
