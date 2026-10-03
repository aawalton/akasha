import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const towerAndTheStarMiriamWarden = {
  id: "01a10340-b23d-735c-a3a6-58cc493cb504",
  type: "page-type/character-class",
  slug: "tower-and-the-star-miriam-warden",
  title: "Warden (Advanced)",
  world: "world/tower-and-the-star",
  character: "character-other/tower-and-the-star-miriam",
  class: "world-class/tower-and-the-star-warden",
} as const satisfies CharacterClass
