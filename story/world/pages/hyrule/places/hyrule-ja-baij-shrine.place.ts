import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleJaBaijShrine = {
  id: "01a10330-06d7-74e8-b53a-1a703861b99c",
  type: "page-type/place",
  slug: "hyrule-ja-baij-shrine",
  title: "Ja Baij Shrine",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
