import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleGreatPlateau = {
  id: "01a10330-06d7-7058-8121-bbcde4ab6f07",
  type: "page-type/place",
  slug: "hyrule-great-plateau",
  title: "The Great Plateau",
  world: "world/hyrule",
  facts: [],
} as const satisfies Place
