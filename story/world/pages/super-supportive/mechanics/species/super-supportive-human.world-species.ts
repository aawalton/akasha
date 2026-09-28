import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveHuman = {
  id: "01a0e9f1-17da-7f07-b69b-a546f2bb7337",
  type: "page-type/world-species",
  slug: "super-supportive-human",
  title: "Human",
  world: "world/super-supportive",
  aliases: ["Earthling"],
  description: "The people of Earth.",
} as const satisfies WorldSpecies
