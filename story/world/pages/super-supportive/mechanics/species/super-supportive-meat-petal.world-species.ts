import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveMeatPetal = {
  id: "01a0e9fc-be82-7c41-83af-9d161cbb616c",
  type: "page-type/world-species",
  slug: "super-supportive-meat-petal",
  title: "Meat petal",
  world: "world/super-supportive",
  aliases: ["meatpetal"],
  description: "A carnivorous plant whose pink slices taste like steak and are safe raw.",
} as const satisfies WorldSpecies
