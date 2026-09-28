import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveHusenot = {
  id: "01a0e9f9-c6a4-7f64-a4fd-81ba636989df",
  type: "page-type/world-species",
  slug: "super-supportive-husenot",
  title: "husenot",
  world: "world/super-supportive",
  aliases: ["rock creatures"],
  description: "A little colorful animal that looks like a rock and pretends to be one for days.",
} as const satisfies WorldSpecies
