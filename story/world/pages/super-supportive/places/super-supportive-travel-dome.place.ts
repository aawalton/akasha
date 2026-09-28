import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveTravelDome = {
  id: "01a0e9ff-6f89-71ba-a9ca-88ea2c224e22",
  type: "page-type/place",
  slug: "super-supportive-travel-dome",
  title: "The Quaternary's Travel Dome",
  world: "world/super-supportive",
  within: "place/super-supportive-moon-thegund",
  secrets: "jsonl",
} as const satisfies Place
