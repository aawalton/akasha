import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleOldManCampfire = {
  id: "01a10330-06d7-7cd7-841d-a3d2b309a858",
  type: "page-type/place",
  slug: "hyrule-old-man-campfire",
  title: "The Old Man's Campfire",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
