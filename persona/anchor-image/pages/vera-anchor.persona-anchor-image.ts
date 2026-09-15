import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const veraAnchor = {
  id: "019f324d-8ef6-75e4-a25f-612e3eacc8ae",
  type: "page-type/persona-anchor-image",
  slug: "vera-anchor",
  title: "Vera — anchor",
  persona: "persona/vera",
  imagePath: "Vera/vera-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
