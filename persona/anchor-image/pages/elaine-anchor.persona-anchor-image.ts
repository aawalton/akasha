import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const elaineAnchor = {
  id: "019f324d-58a9-7ab0-a7b3-ee6b37d18e96",
  type: "page-type/persona-anchor-image",
  slug: "elaine-anchor",
  title: "Elaine — anchor",
  persona: "persona/elaine",
  imagePath: "Elaine/elaine-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
