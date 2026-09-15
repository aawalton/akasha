import type { Grade } from "akasha/persona/anchor-image/properties/grade.rank-property.types.ts"
import type { PersonaImage } from "akasha/persona/image/persona-image.page-type.types.ts"

export type PersonaAnchorImage = PersonaImage & {
  grade?: Grade
}
