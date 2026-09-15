import type { PersonaCoverImage } from "akasha/persona/cover-image/persona-cover-image.page-type.types.ts"

export const echoL5 = {
  id: "019f324d-8727-7e75-827b-57f26452fdca",
  type: "page-type/persona-cover-image",
  slug: "echo-l5",
  title: "Echo cover L5",
  persona: "persona/echo",
  relationshipLevel: 5,
} as const satisfies PersonaCoverImage
