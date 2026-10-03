import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleBokoblinCamp = {
  id: "01a10330-06d6-7136-956f-be81301a2a1b",
  type: "page-type/place",
  slug: "hyrule-bokoblin-camp",
  title: "The Bokoblin Camp",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
