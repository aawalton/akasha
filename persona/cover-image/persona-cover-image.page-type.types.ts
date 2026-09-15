import type { RelationshipLevel } from "akasha/persona/closeness-level/properties/relationship-level.number-property.types.ts"
import type { PersonaImage } from "akasha/persona/image/persona-image.page-type.types.ts"

export type PersonaCoverImage = PersonaImage & {
  relationshipLevel: RelationshipLevel
}
