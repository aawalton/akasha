import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lordOfWaves = {
  id: "01a0657e-021b-75c2-a539-6d0e8defdadb",
  type: "page-type/world-class",
  slug: "lord-of-waves",
  title: "Lord of Waves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
