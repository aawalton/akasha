import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const partnersTheUnderstair = {
  id: "01a0ddf4-cb0a-744c-8c6b-abc2bbe23b60",
  type: "page-type/place",
  slug: "partners-the-understair",
  title: "The Understair",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/partners-hearthholt",
} as const satisfies Place
