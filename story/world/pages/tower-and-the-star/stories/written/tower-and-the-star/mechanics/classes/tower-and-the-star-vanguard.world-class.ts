import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarVanguard = {
  id: "01a1033f-b3b4-74b8-87df-c8614e61773c",
  type: "page-type/world-class",
  slug: "tower-and-the-star-vanguard",
  title: "Vanguard",
  world: "world/tower-and-the-star",
  description:
    "A front-line defender who holds the line with shield and gauntlets, with skills such as Shield Rush and Iron Stance.",
} as const satisfies WorldClass
