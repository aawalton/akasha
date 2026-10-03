import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleOwaDaimShrine = {
  id: "01a10330-06d7-73e1-8d3e-a182483d54de",
  type: "page-type/place",
  slug: "hyrule-owa-daim-shrine",
  title: "Owa Daim Shrine",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
