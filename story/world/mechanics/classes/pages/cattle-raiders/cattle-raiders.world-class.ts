import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cattleRaiders = {
  id: "01a0657e-01c3-798b-807b-8dde221a60a6",
  type: "page-type/world-class",
  slug: "cattle-raiders",
  title: "Cattle Raiders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
