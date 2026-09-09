import type { Page } from "../../../pages/page.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Puzzles } from "./properties/puzzles.page-property-entry.ts"

export type ChessPuzzleSet = Page & {
  title: Title
  puzzles?: Puzzles
}
