import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gamer = {
  id: "01a0657e-1366-7e5c-b846-9af92b8190ba",
  type: "page-type/world-class",
  slug: "gamer",
  title: "Gamer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
