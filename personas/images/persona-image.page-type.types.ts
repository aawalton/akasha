import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { ImagePath } from "./properties/image-path.text-property.ts"
import type { ImagePersona } from "./properties/image-persona.relation-property.ts"
import type { ImageRoot } from "./properties/image-root.text-property.ts"

export type PersonaImage = Page & {
  title: Title
  persona: ImagePersona
  imagePath?: ImagePath
  imageRoot?: ImageRoot
}
