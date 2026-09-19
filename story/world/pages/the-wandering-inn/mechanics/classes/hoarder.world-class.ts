import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hoarder = {
  id: "01a0657e-1374-7e8b-8327-00aaf38d25d6",
  type: "page-type/world-class",
  slug: "hoarder",
  title: "Hoarder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
