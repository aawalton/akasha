import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveMatadero = {
  id: "01a0ea01-a004-75a1-ad30-df0018d23384",
  type: "page-type/place",
  slug: "super-supportive-matadero",
  title: "Matadero",
  world: "world/super-supportive",
  within: "place/super-supportive-anesidora",
  secrets: "jsonl",
} as const satisfies Place
