import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveGlobie = {
  id: "01a0e9f9-c6a5-739a-9483-afa7b3702422",
  type: "page-type/world-title",
  slug: "super-supportive-globie",
  title: "globie",
  world: "world/super-supportive",
  aliases: ["globies", "globals"],
  description: "An Anesidoran name for an Avowed from the rest of Earth, said fondly or angrily.",
} as const satisfies WorldTitle
