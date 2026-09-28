import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveGardenHall = {
  id: "01a0ea01-a003-797d-adf9-86342a161fa4",
  type: "page-type/place",
  slug: "super-supportive-garden-hall",
  title: "Garden Hall",
  world: "world/super-supportive",
  within: "place/super-supportive-celena-north-high",
  secrets: "jsonl",
} as const satisfies Place
