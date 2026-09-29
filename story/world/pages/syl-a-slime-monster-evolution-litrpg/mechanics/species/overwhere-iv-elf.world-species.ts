import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvElf = {
  id: "01a0ed2f-df54-7688-8b25-5af51e7549f7",
  type: "page-type/world-species",
  slug: "overwhere-iv-elf",
  title: "Elf",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A long-lived people with pointed ears, gifted in magic, the bow and the blade.",
} as const satisfies WorldSpecies
