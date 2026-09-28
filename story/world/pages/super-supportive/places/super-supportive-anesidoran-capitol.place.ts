import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveAnesidoranCapitol = {
  id: "01a0e9fd-811a-7b65-b626-bb49d846a174",
  type: "page-type/place",
  slug: "super-supportive-anesidoran-capitol",
  title: "Anesidoran Capitol",
  world: "world/super-supportive",
  within: "place/super-supportive-anesidora",
  secrets: "jsonl",
} as const satisfies Place
