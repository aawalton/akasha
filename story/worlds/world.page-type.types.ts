import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { CharacterReadings } from "akasha/story/worlds/properties/character-readings.page-property-entry.types.ts"
import type { MechanicReadings } from "akasha/story/worlds/properties/mechanic-readings.page-property-entry.types.ts"

export type World = Page & {
  title: Title
  characterReadings?: CharacterReadings
  mechanicReadings?: MechanicReadings
}
