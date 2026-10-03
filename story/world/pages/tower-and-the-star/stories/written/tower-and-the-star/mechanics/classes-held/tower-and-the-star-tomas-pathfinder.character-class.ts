import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const towerAndTheStarTomasPathfinder = {
  id: "01a10340-b23e-7da3-97a2-4629b3922584",
  type: "page-type/character-class",
  slug: "tower-and-the-star-tomas-pathfinder",
  title: "Pathfinder (Advanced)",
  world: "world/tower-and-the-star",
  character: "character-other/tower-and-the-star-tomas",
  class: "world-class/tower-and-the-star-pathfinder",
} as const satisfies CharacterClass
