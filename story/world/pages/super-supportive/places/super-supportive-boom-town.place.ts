import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveBoomTown = {
  id: "01a0ea01-a002-7d5d-9205-a3db8378e37f",
  type: "page-type/place",
  slug: "super-supportive-boom-town",
  title: "Boom Town",
  world: "world/super-supportive",
  within: "place/super-supportive-apex",
  secrets: "jsonl",
} as const satisfies Place
