import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveAmbassadorsResidence = {
  id: "01a0ea05-7a5b-7069-ac5f-97567eab39f0",
  type: "page-type/place",
  slug: "super-supportive-ambassadors-residence",
  title: "Artonan Ambassador's Residence",
  world: "world/super-supportive",
  within: "place/super-supportive-punta-de-la-luna",
  secrets: "jsonl",
} as const satisfies Place
