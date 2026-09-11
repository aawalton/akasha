import type { Grade } from "akasha/personas/anchor-images/properties/grade.rank-property.ts"
import type { PersonaImage } from "akasha/personas/images/persona-image.page-type.types.ts"

export type PersonaAnchorImage = PersonaImage & {
  grade?: Grade
}
