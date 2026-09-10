import type { PersonaImage } from "../images/persona-image.page-type.types.ts"
import type { Grade } from "./properties/grade.text-property.ts"

export type PersonaAnchorImage = PersonaImage & {
  grade?: Grade
}
