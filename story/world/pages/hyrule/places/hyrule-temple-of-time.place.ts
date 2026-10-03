import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleTempleOfTime = {
  id: "01a10330-06d7-7230-b370-4ace040d5b09",
  type: "page-type/place",
  slug: "hyrule-temple-of-time",
  title: "Temple of Time",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
