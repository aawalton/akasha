import type { RelationshipLevel } from "akasha/personas/closeness-levels/properties/relationship-level.number-property.types.ts"
import type { Stage } from "akasha/personas/closeness-levels/properties/stage.text-property.ts"
import type { PersonaImage } from "akasha/personas/images/persona-image.page-type.types.ts"
import type { ValueSlug } from "akasha/personas/properties/value-slug.text-property.ts"
import type { EsoDay } from "akasha/personas/wallpapers/properties/eso-day.text-property.ts"

export type PersonaWallpaper = PersonaImage & {
  relationshipLevel?: RelationshipLevel
  stage?: Stage
  esoDay?: EsoDay
  valueSlug?: ValueSlug
}
