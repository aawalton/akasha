import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { ImagePath } from "akasha/personas/images/properties/image-path.text-property.types.ts"
import type { ImagePersona } from "akasha/personas/images/properties/image-persona.relation-property.types.ts"
import type { ImageRoot } from "akasha/personas/images/properties/image-root.text-property.types.ts"

export type PersonaImage = Page & {
  title: Title
  persona: ImagePersona
  imagePath?: ImagePath
  imageRoot?: ImageRoot
}
