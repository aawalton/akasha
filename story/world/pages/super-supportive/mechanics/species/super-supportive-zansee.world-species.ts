import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveZansee = {
  id: "01a0e9f9-c6a5-7dfa-807d-c91c34d66f2e",
  type: "page-type/world-species",
  slug: "super-supportive-zansee",
  title: "zansees",
  world: "world/super-supportive",
  aliases: ["shiny water bugs"],
  description: "Fast metallic stream bugs that flash light at night.",
} as const satisfies WorldSpecies
