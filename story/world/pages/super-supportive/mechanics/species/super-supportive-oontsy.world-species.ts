import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveOontsy = {
  id: "01a0e9f9-c6a5-7101-9aa6-e729595eca26",
  type: "page-type/world-species",
  slug: "super-supportive-oontsy",
  title: "oontsy",
  world: "world/super-supportive",
  aliases: ["oontsies"],
  description: "A slimy Artonan animal.",
} as const satisfies WorldSpecies
