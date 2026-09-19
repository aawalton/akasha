import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doomsayer = {
  id: "01a0657e-1356-7d55-b427-efd98c9be3df",
  type: "page-type/world-class",
  slug: "doomsayer",
  title: "Doomsayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
