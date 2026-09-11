import type { PersonaAnchorImage } from "akasha/personas/anchor-images/persona-anchor-image.page-type.types.ts"

export const echoAnchor = {
  id: "019f324d-85e1-759b-9f30-c38e10308a83",
  type: "persona-anchor-image",
  slug: "echo-anchor",
  title: "Echo — anchor",
  persona: "echo",
  imagePath: "Echo/echo-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
