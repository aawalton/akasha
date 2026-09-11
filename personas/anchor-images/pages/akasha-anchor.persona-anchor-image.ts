import type { PersonaAnchorImage } from "akasha/personas/anchor-images/persona-anchor-image.page-type.types.ts"

export const akashaAnchor = {
  id: "01a04a2e-5f47-7499-ad8c-9dc31e175949",
  type: "persona-anchor-image",
  slug: "akasha-anchor",
  title: "Akasha — anchor",
  persona: "akasha",
  imagePath: "Akasha/akasha-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
