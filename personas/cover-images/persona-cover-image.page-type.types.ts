import type { RelationshipLevel } from "akasha/personas/closeness-levels/properties/relationship-level.number-property.types.ts"
import type { PersonaImage } from "akasha/personas/images/persona-image.page-type.types.ts"

export type PersonaCoverImage = PersonaImage & {
  relationshipLevel: RelationshipLevel
}
