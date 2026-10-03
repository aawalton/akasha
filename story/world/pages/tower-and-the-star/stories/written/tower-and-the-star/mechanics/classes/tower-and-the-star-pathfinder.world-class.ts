import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarPathfinder = {
  id: "01a1033f-b3b4-7146-bdd9-588a8bc6fdd2",
  type: "page-type/world-class",
  slug: "tower-and-the-star-pathfinder",
  title: "Pathfinder",
  world: "world/tower-and-the-star",
  description:
    "A scout and archer, with skills such as Terrain Read, Eagle Eye and Precision Shot.",
} as const satisfies WorldClass
