import type { PersonaImage } from "../images/persona-image.page-type.types.ts"
import type { Grade } from "./properties/grade.rank-property.ts"

export type PersonaAnchorImage = PersonaImage & {
  grade?: Grade
}
