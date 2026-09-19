import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mugger = {
  id: "01a0657e-0234-704b-a8d9-28947b8be338",
  type: "page-type/world-class",
  slug: "mugger",
  title: "Mugger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
