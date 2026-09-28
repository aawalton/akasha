import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveIcorlax = {
  id: "01a0e9f1-17da-78a3-b32e-fa62a629e4e7",
  type: "page-type/world-species",
  slug: "super-supportive-icorlax",
  title: "Icorlax",
  world: "world/super-supportive",
  aliases: ["feathery aliens"],
  description: "A rare winged species that makes companions feel well.",
} as const satisfies WorldSpecies
