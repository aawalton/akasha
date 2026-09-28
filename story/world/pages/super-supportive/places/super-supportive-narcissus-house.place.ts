import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveNarcissusHouse = {
  id: "01a0ea03-98a6-759c-b741-345e89dd0bdc",
  type: "page-type/place",
  slug: "super-supportive-narcissus-house",
  title: "Narcissus House",
  world: "world/super-supportive",
  within: "place/super-supportive-apex",
  secrets: "jsonl",
} as const satisfies Place
