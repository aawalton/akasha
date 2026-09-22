import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rocksoupCook = {
  id: "01a0657e-0247-73af-a16d-d5f9cc94f666",
  type: "page-type/world-class",
  slug: "rocksoup-cook",
  title: "Rocksoup Cook",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
