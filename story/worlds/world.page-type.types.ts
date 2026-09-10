import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { CharacterReadings } from "./properties/character-readings.page-property-entry.ts"
import type { MechanicReadings } from "./properties/mechanic-readings.page-property-entry.ts"

export type World = Page & {
  title: Title
  characterReadings?: CharacterReadings
  mechanicReadings?: MechanicReadings
}
