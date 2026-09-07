import type { PersonaAnchorImage } from "../persona-anchor-image.page-type.ts"

export const echoAnchor = {
  id: "019f324d-85e1-759b-9f30-c38e10308a83",
  pageTypeSlug: "persona-anchor-image",
  slug: "echo-anchor",
  title: "Echo — anchor",
  personaSlug: "echo",
  imagePath: "Echo/echo-anchor.png",
  imageRoot: "personas",
} as const satisfies PersonaAnchorImage
