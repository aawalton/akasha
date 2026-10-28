import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CharacterReadings } from "akasha/story/world/properties/character-readings.page-property-entry.types.ts"
import type { MechanicReadings } from "akasha/story/world/properties/mechanic-readings.page-property-entry.types.ts"
import type { Testing } from "akasha/story/world/properties/testing.boolean-property.types.ts"
import type { TitleName } from "akasha/story/world/properties/title-name.text-property.types.ts"

export type World = Page & {
  title: Title
  titleName?: TitleName
  characterReadings?: CharacterReadings
  mechanicReadings?: MechanicReadings
  testing?: Testing
}
