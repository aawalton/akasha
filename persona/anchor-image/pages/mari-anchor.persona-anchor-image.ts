import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const mariAnchor = {
  id: "019f324d-5141-7984-911e-bd75963f215b",
  type: "page-type/persona-anchor-image",
  slug: "mari-anchor",
  title: "Mari — anchor",
  persona: "persona/mari",
  imagePath: "Mari/mari-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
