import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const allTerrainRiders = {
  id: "01a0657e-132c-74e5-a54b-43848dfbc106",
  type: "page-type/world-class",
  slug: "all-terrain-riders",
  title: "All-Terrain Riders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
