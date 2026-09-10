import type { Hex } from "../../../design/colors/properties/hex.text-property.ts"
import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { CellsCleared } from "./properties/cells-cleared.number-property.ts"
import type { Craters } from "./properties/craters.number-property.ts"
import type { HazardsMarked } from "./properties/hazards-marked.number-property.ts"
import type { ZonesCompleted } from "./properties/zones-completed.number-property.ts"

export type CtwTeam = Page & {
  title: Title
  cellsCleared: CellsCleared
  craters: Craters
  hazardsMarked: HazardsMarked
  zonesCompleted: ZonesCompleted
  hex: Hex
}
