import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvHobgoblin = {
  id: "01a0ed2f-df54-7a31-b133-12179522c2fe",
  type: "page-type/world-species",
  slug: "overwhere-iv-hobgoblin",
  title: "Hobgoblin",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A goblin grown to a man's height and more, broad and strong, often a chief.",
  evolvesFromSlugs: ["world-species/overwhere-iv-goblin"],
  createdAt: "2026-09-29T12:42:12.692Z",
  updatedAt: "2026-09-29T12:42:15.000Z",
} as const satisfies WorldSpecies
