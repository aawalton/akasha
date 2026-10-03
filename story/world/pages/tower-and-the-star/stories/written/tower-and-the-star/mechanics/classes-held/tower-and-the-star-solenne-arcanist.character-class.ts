import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const towerAndTheStarSolenneArcanist = {
  id: "01a10340-b23e-7273-abd3-3bd8b6827f54",
  type: "page-type/character-class",
  slug: "tower-and-the-star-solenne-arcanist",
  title: "Arcanist (Advanced)",
  world: "world/tower-and-the-star",
  character: "character-other/tower-and-the-star-solenne",
  class: "world-class/tower-and-the-star-arcanist",
} as const satisfies CharacterClass
