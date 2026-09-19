import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dungeonConqueror = {
  id: "01a0657e-01d5-71ec-819b-6fac3a8bb68c",
  type: "page-type/world-class",
  slug: "dungeon-conqueror",
  title: "Dungeon Conqueror",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
