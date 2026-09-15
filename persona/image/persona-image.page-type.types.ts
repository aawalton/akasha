import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ImagePath } from "akasha/persona/image/properties/image-path.text-property.types.ts"
import type { ImagePersona } from "akasha/persona/image/properties/image-persona.relation-property.types.ts"
import type { ImageRoot } from "akasha/persona/image/properties/image-root.text-property.types.ts"

export type PersonaImage = Page & {
  title: Title
  persona: ImagePersona
  imagePath?: ImagePath
  imageRoot?: ImageRoot
}
