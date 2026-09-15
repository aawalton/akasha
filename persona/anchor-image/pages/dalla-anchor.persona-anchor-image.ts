import type { PersonaAnchorImage } from "akasha/persona/anchor-image/persona-anchor-image.page-type.types.ts"

export const dallaAnchor = {
  id: "019f324d-74cf-7ed0-89af-819fb7170dff",
  type: "page-type/persona-anchor-image",
  slug: "dalla-anchor",
  title: "Dalla — anchor",
  persona: "persona/dalla",
  imagePath: "Dalla/dalla-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
