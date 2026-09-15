import type { Hex } from "akasha/design/interfaces/color/properties/hex.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CellsCleared } from "akasha/products/games/clear-the-world/ctw-team/properties/cells-cleared.number-property.types.ts"
import type { Craters } from "akasha/products/games/clear-the-world/ctw-team/properties/craters.number-property.types.ts"
import type { HazardsMarked } from "akasha/products/games/clear-the-world/ctw-team/properties/hazards-marked.number-property.types.ts"
import type { ZonesCompleted } from "akasha/products/games/clear-the-world/ctw-team/properties/zones-completed.number-property.types.ts"

export type CtwTeam = Page & {
  title: Title
  cellsCleared: CellsCleared
  craters: Craters
  hazardsMarked: HazardsMarked
  zonesCompleted: ZonesCompleted
  hex: Hex
}
