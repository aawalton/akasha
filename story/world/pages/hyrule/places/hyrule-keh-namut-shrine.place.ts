import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleKehNamutShrine = {
  id: "01a10330-06d7-7e2e-b283-a5fbd40e7779",
  type: "page-type/place",
  slug: "hyrule-keh-namut-shrine",
  title: "Keh Namut Shrine",
  world: "world/hyrule",
  within: "place/hyrule-mount-hylia",
  facts: [],
} as const satisfies Place
