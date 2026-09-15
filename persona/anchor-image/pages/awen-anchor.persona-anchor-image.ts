import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const awenAnchor = {
  id: "019f324d-697e-7d62-bcd2-b1be162cc4d8",
  type: "page-type/persona-anchor-image",
  slug: "awen-anchor",
  title: "Awen — anchor",
  persona: "persona/awen",
  imagePath: "Awen/awen-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
