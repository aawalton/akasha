import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveDemon = {
  id: "01a0e9f1-17da-7214-9019-1f8794116f98",
  type: "page-type/world-species",
  slug: "super-supportive-demon",
  title: "Demon",
  world: "world/super-supportive",
  aliases: ["true demons"],
  description: "A monster made of pure chaos.",
} as const satisfies WorldSpecies
