import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveHealingHospital = {
  id: "01a0ea04-78ca-724d-8b07-99c0aec1eaa0",
  type: "page-type/place",
  slug: "super-supportive-healing-hospital",
  title: "Anesidora Healing Hospital",
  world: "world/super-supportive",
  within: "place/super-supportive-f-city",
  secrets: "jsonl",
} as const satisfies Place
