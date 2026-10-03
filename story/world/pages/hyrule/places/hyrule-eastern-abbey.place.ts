import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleEasternAbbey = {
  id: "01a10330-06d7-72a8-bfb2-2db8465df68a",
  type: "page-type/place",
  slug: "hyrule-eastern-abbey",
  title: "Eastern Abbey",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
