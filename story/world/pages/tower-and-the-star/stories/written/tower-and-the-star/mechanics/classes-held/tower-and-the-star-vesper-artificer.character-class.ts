import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const towerAndTheStarVesperArtificer = {
  id: "01a10340-b23e-7aa7-ba01-a5545daeb7ab",
  type: "page-type/character-class",
  slug: "tower-and-the-star-vesper-artificer",
  title: "Artificer (Advanced)",
  world: "world/tower-and-the-star",
  character: "character-other/tower-and-the-star-vesper",
  class: "world-class/tower-and-the-star-artificer",
} as const satisfies CharacterClass
