import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvHobgoblin = {
  id: "01a0ed2f-df54-7a31-b133-12179522c2fe",
  type: "page-type/world-species",
  slug: "overwhere-iv-hobgoblin",
  title: "Hobgoblin",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A goblin grown to a man's height and more, broad and strong, often a chief.",
  evolvesFromSlugs: ["world-species/overwhere-iv-goblin"],
} as const satisfies WorldSpecies
