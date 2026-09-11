import type { Puzzles } from "akasha/alan/chess/puzzle-sets/properties/puzzles.page-property-entry.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type ChessPuzzleSet = Page & {
  title: Title
  puzzles?: Puzzles
}
