import type { Persona } from "./persona.page-type.types.ts"
import type { PersonaRelationshipLevel } from "./properties/persona-relationship-level.computed-property.ts"

export type WorkedPersona = Persona & {
  relationshipLevel?: PersonaRelationshipLevel
}
