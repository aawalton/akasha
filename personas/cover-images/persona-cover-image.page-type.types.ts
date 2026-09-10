import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { PersonaImage } from "../images/persona-image.page-type.types.ts"

export type PersonaCoverImage = PersonaImage & {
  relationshipLevel: RelationshipLevel
}
