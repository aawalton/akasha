import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleTempleOfTime = {
  id: "01a10330-06d7-7230-b370-4ace040d5b09",
  type: "page-type/place",
  slug: "hyrule-temple-of-time",
  title: "Temple of Time",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
  createdAt: "2026-10-03T19:14:01.559Z",
  updatedAt: "2026-10-03T19:14:04.000Z",
} as const satisfies Place
