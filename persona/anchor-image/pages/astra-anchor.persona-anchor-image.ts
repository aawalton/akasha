import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const astraAnchor = {
  id: "019f324d-6f43-776b-99c5-30631d4736a4",
  type: "page-type/persona-anchor-image",
  slug: "astra-anchor",
  title: "Astra — anchor",
  persona: "persona/astra",
  imagePath: "Astra/astra-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
