import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleOmanAuShrine = {
  id: "01a10330-06d7-7a1a-88a2-024397c3b857",
  type: "page-type/place",
  slug: "hyrule-oman-au-shrine",
  title: "Oman Au Shrine",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
