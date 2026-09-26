import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"
import type { HaremHotelClassCharacter } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/classes/properties/harem-hotel-class-character.relation-property.types.ts"
import type { HaremHotelClassClass } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/classes/properties/harem-hotel-class-class.relation-property.types.ts"

export type HaremHotelClass = WorldClass & {
  character: HaremHotelClassCharacter
  class: HaremHotelClassClass
}
