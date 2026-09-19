import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const muggers = {
  id: "01a0657e-13a3-7041-b600-1573e5f2db2d",
  type: "page-type/world-class",
  slug: "muggers",
  title: "Muggers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
