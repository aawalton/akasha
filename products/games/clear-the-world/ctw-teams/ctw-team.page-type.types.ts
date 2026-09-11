import type { Hex } from "akasha/design/interfaces/colors/properties/hex.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { CellsCleared } from "akasha/products/games/clear-the-world/ctw-teams/properties/cells-cleared.number-property.types.ts"
import type { Craters } from "akasha/products/games/clear-the-world/ctw-teams/properties/craters.number-property.types.ts"
import type { HazardsMarked } from "akasha/products/games/clear-the-world/ctw-teams/properties/hazards-marked.number-property.types.ts"
import type { ZonesCompleted } from "akasha/products/games/clear-the-world/ctw-teams/properties/zones-completed.number-property.types.ts"

export type CtwTeam = Page & {
  title: Title
  cellsCleared: CellsCleared
  craters: Craters
  hazardsMarked: HazardsMarked
  zonesCompleted: ZonesCompleted
  hex: Hex
}
