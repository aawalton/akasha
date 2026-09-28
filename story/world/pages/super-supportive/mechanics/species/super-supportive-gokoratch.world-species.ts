import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveGokoratch = {
  id: "01a0e9f9-c6a4-7532-bc40-358ab01eb93d",
  type: "page-type/world-species",
  slug: "super-supportive-gokoratch",
  title: "gokoratch",
  world: "world/super-supportive",
  aliases: ["gokoratches"],
  description: "A loud, foul-smelling parrotlike creature known for eating its nestmates.",
} as const satisfies WorldSpecies
