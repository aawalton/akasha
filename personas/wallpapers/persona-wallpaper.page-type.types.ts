import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { Stage } from "../closeness-levels/properties/stage.text-property.ts"
import type { PersonaImage } from "../images/persona-image.page-type.types.ts"
import type { ValueSlug } from "../properties/value-slug.text-property.ts"
import type { EsoDay } from "./properties/eso-day.text-property.ts"

export type PersonaWallpaper = PersonaImage & {
  relationshipLevel?: RelationshipLevel
  stage?: Stage
  esoDay?: EsoDay
  valueSlug?: ValueSlug
}
