import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleOldManCabin = {
  id: "01a10330-06d7-7f18-84db-f6950d5d55c6",
  type: "page-type/place",
  slug: "hyrule-old-man-cabin",
  title: "The Old Man's Cabin",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
