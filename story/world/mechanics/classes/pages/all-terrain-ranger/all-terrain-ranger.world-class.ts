import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const allTerrainRanger = {
  id: "01a0657e-01a7-73b2-be45-288a6599fb62",
  type: "page-type/world-class",
  slug: "all-terrain-ranger",
  title: "All-Terrain Ranger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
