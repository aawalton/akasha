import type { RelationshipLevel } from "akasha/persona/closeness-level/properties/relationship-level.number-property.types.ts"
import type { Stage } from "akasha/persona/closeness-level/properties/stage.text-property.types.ts"
import type { PersonaImage } from "akasha/persona/image/persona-image.page-type.types.ts"
import type { ValueSlug } from "akasha/persona/properties/value-slug.text-property.types.ts"
import type { EsoDay } from "akasha/persona/wallpaper/properties/eso-day.text-property.types.ts"

export type PersonaWallpaper = PersonaImage & {
  relationshipLevel?: RelationshipLevel
  stage?: Stage
  esoDay?: EsoDay
  valueSlug?: ValueSlug
}
