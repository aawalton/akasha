import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveConniesApartment = {
  id: "01a0ea06-6477-74d4-84a7-2de20bdd0e4e",
  type: "page-type/place",
  slug: "super-supportive-connies-apartment",
  title: "Connie Hatcher's Apartment",
  world: "world/super-supportive",
  within: "place/otherwhere-iii-chicago",
  secrets: "jsonl",
} as const satisfies Place
