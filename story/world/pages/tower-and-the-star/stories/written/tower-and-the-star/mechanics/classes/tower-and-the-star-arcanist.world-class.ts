import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarArcanist = {
  id: "01a1033f-b3b3-7285-863a-16d1cdcf6e6b",
  type: "page-type/world-class",
  slug: "tower-and-the-star-arcanist",
  title: "Arcanist",
  world: "world/tower-and-the-star",
  description:
    "A caster who reads and channels Mana, with skills such as Arcane Analysis, Arcane Bolt and Ley Conduit.",
} as const satisfies WorldClass
