import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveDemonBug = {
  id: "01a0e9f1-17da-7b51-a5db-4400d5359aa1",
  type: "page-type/world-species",
  slug: "super-supportive-demon-bug",
  title: "Demon bug",
  world: "world/super-supportive",
  aliases: ["chaos bugs", "grasshopper demons"],
  description: "Tiny flying black demons that pass through things and leave holes.",
} as const satisfies WorldSpecies
