import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const halfElf = {
  id: "01a0655a-0687-75e4-b42e-cc53cafcc644",
  type: "page-type/world-species",
  slug: "half-elf",
  title: "Half-Elf",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpecies
