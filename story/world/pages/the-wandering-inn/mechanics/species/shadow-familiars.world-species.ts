import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const shadowFamiliars = {
  id: "01a0655a-0687-7323-ad17-017b1d2ea8b2",
  type: "page-type/world-species",
  slug: "shadow-familiars",
  title: "Shadow Familiars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpecies
